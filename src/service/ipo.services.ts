import { db } from "@/config/firebase.config";
import { ICompanySchema } from "@/schema/company.schema";
import { IIPOSchema } from "@/schema/ipo.schema";
import { convertToISODate } from "@utils/genaralFunctions";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

export const fetchCompanyIPOByIdAPI = async (companyId: string) => {
  try {
    const ipoRef = collection(db, "ipos");
    const ipoQuery = query(ipoRef, where("company_id", "==", companyId));

    const snapshot = await getDocs(ipoQuery);

    if (snapshot.empty) {
      console.log("No IPO found for this Company!");
      return null;
    }

    const ipoData = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
      ...ipoData,
      created_at:
        ipoData.created_at instanceof Timestamp
          ? convertToISODate(ipoData.created_at)
          : ipoData.created_at.toString(),
      updated_at:
        ipoData.updated_at instanceof Timestamp
          ? convertToISODate(ipoData.updated_at)
          : ipoData.updated_at.toString(),
    } as IIPOSchema;
    // const ipoRef = doc(db, "ipos", "XAVR0PlTIRLJcBRP8e2n");
    // const snapshot = await getDoc(ipoRef);
    // if (!snapshot.exists()) {
    //   console.log("IPO does not exist!");
    //   return null;
    // }
    // return snapshot.data() as IIPOSchema;
  } catch (error) {
    console.error("Error fetching company's IPO by ID:", error);
    return null;
  }
};
