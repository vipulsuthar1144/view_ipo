import { db } from "@/config/firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";

export const fetchCompaniesListAPI = async ({
  pageSize,
  lastVisible,
}: {
  pageSize: number;
  lastVisible?: string | null;
}) => {
  try {
    const companyCollection = collection(db, "companies");
    let queryParams;
    if (lastVisible) {
      queryParams = query(
        companyCollection,
        orderBy("created_at", "desc"),
        startAfter(`${lastVisible}`),
        limit(pageSize)
      );
    } else {
      queryParams = query(
        companyCollection,
        orderBy("created_at", "desc"),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(queryParams);

    // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const companyList = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at:
          data.created_at instanceof Timestamp
            ? data.created_at.toDate().toString()
            : data.created_at.toString(),
        updated_at:
          data.updated_at instanceof Timestamp
            ? data.updated_at.toDate().toString()
            : data.updated_at.toString(),
      };
    });
    const visible = snapshot.docs[snapshot.docs.length - 1].id;
    return { companies: companyList, lastVisible: visible };
  } catch (e) {
    console.error("Error initializing Firebase SDK:", e);
    return null;
  }
};

export const fetchCompanyByIdAPI = async (companyId: string) => {
  try {
    const companyRef = doc(db, "companies", companyId);
    const snapshot = await getDoc(companyRef);
    if (!snapshot.exists()) {
      console.log("Document does not exist!");
      return null;
    }
    return snapshot.data();
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return null;
  }
};
