import { ipoCollectionName, db, errorHandler } from "@/config/firebase.config";
import { IIPOSchema, ISubscription } from "@/schema/ipo.schema";
import { convertToISODate } from "@utils/genaralFunctions";
import { addDoc, collection, deleteDoc, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export const fetchCompanyIPOByIdAPI = async (companyId: string) => {
  try {
    const companyRef = doc(db, ipoCollectionName, companyId);
    const snapshot = await getDoc(companyRef);
    if (!snapshot.exists()) {
      console.error("Document does not exist!");
      return null;
    }
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      created_at: data.created_at instanceof Timestamp ? convertToISODate(data.created_at) : data.created_at,
      updated_at: data.updated_at instanceof Timestamp ? convertToISODate(data.updated_at) : data.updated_at,
    } as IIPOSchema;
    // return snapshot.data() as ICompanySchema;
  } catch (error: any) {
    console.error("Error fetching company by ID:", error);
    errorHandler(error);
    return null;
  }
};

export const deleteIPObyIdAPI = async (id: string) => {
  try {
    const ipoRef = doc(db, ipoCollectionName, id);
    await deleteDoc(ipoRef);
  } catch (error: any) {
    console.error("Error deleting IPO:", error);
    errorHandler(error);
  }
};

export const addIPOAPI = async (data: IIPOSchema) => {
  try {
    const convertedData = convertForceStringSchema(data);
    const ipoRef = collection(db, ipoCollectionName);
    await addDoc(ipoRef, { ...convertedData, created_at: Timestamp.now(), updated_at: Timestamp.now() });
  } catch (error: any) {
    console.error("Error adding IPO:", error);
    errorHandler(error);
  }
};

export const updateIPOAPI = async (id: string, data: IIPOSchema) => {
  try {
    const convertedData = convertForceStringSchema(data);
    const ipoRef = doc(db, ipoCollectionName, id);
    await updateDoc(ipoRef, { ...convertedData, updated_at: Timestamp.now() });
  } catch (error: any) {
    console.error("Error updating IPO:", error);
    errorHandler(error);
  }
};

export interface IIPOStringSchema {
  [key: string]: string | IIPOStringSchema | IIPOStringSchema[];
}

const convertForceStringSchema = (data: IIPOSchema): IIPOStringSchema => {
  const calculateTotals = (key: string, value: any): any => {
    if (key === "issue_size" && value) {
      value.total = (Number(value.fresh) || 0) + (Number(value.offer_for_sale) || 0);
    } else if (key === "nii" && value) {
      value.total = (Number(value.s_nii) || 0) + (Number(value.b_nii) || 0);
    } else if (key === "applications" && value) {
      const retail = Number(value.retail) || 0;
      const nii = value.nii ? (Number(value.nii.s_nii) || 0) + (Number(value.nii.b_nii) || 0) : 0;
      value.total = retail + nii + (Number(value.qib) || 0);
    } else if (key === "subscriptions" && Array.isArray(value)) {
      value.forEach((subscription: ISubscription) => {
        const retail = Number(subscription.retail) || 0;
        const qib = Number(subscription.qib) || 0;
        const niiTotal = subscription.nii
          ? (Number(subscription.nii.s_nii) || 0) + (Number(subscription.nii.b_nii) || 0)
          : 0;
        subscription.total = retail + qib + niiTotal; // Correct calculation for total
      });
    }
    return value;
  };

  const convertToString = (value: any, key?: string): any => {
    if (key === "is_active") {
      return value;
    }
    if (Array.isArray(value)) {
      return value.map((item) => convertToString(item));
    } else if (value && typeof value === "object") {
      const updatedValue = calculateTotals(key || "", value);
      return Object.keys(updatedValue).reduce(
        (acc, k) => {
          acc[k] = convertToString(updatedValue[k], k);
          return acc;
        },
        {} as Record<string, string>
      );
    } else {
      return value !== undefined ? String(value) : "";
    }
  };

  return convertToString(data) as IIPOStringSchema;
};
