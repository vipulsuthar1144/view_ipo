import { ipoCollectionName, db, errorHandler } from "@/config/firebase.config";
import { IIPOSchema } from "@/schema/ipo.schema";
import { convertToISODate } from "@utils/genaralFunctions";
import { addDoc, collection, deleteDoc, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export const fetchCompanyIPOByIdAPI = async (companyId: string) => {
  try {
    const companyRef = doc(db, ipoCollectionName, companyId);
    const snapshot = await getDoc(companyRef);
    if (!snapshot.exists()) {
      console.log("Document does not exist!");
      return null;
    }
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      created_at: data.created_at instanceof Timestamp ? convertToISODate(data.created_at) : data.created_at.toString(),
      updated_at: data.updated_at instanceof Timestamp ? convertToISODate(data.updated_at) : data.updated_at.toString(),
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
    console.log("IPO deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting IPO:", error);
    errorHandler(error);
  }
};

export const addIPOAPI = async (data: IIPOSchema) => {
  try {
    const jsonData = JSON.stringify(data);
    console.log("data for add: ", data, jsonData);

    const ipoRef = collection(db, ipoCollectionName);
    const ipoDoc = await addDoc(ipoRef, { ...data, created_at: Timestamp.now(), updated_at: Timestamp.now() });
    console.log("IPO added successfully with ID: ", ipoDoc.id);
  } catch (error: any) {
    console.error("Error adding IPO:", error);
    errorHandler(error);
  }
};

export const updateIPOAPI = async (id: string, data: IIPOSchema) => {
  try {
    console.log("data for update: ", data);

    const ipoRef = doc(db, ipoCollectionName, id);
    await updateDoc(ipoRef, { ...data, updated_at: Timestamp.now() });
    console.log("IPO updated successfully!");
  } catch (error: any) {
    console.error("Error updating IPO:", error);
    errorHandler(error);
  }
};
