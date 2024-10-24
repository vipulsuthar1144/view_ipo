import { db } from "@/config/firebase.config";
import { ICompanySchema } from "@/schema/company.schema";
import { IIPOSchema } from "@/schema/ipo.schema";
import { convertToISODate } from "@utils/genaralFunctions";
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
  where,
} from "firebase/firestore";

export const fetchCompaniesListAPI = async ({
  pageSize,
  lastVisible,
}: {
  pageSize: number;
  lastVisible?: string | null;
}) => {
  try {
    const companyCollection = collection(db, "ipos");
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
            ? convertToISODate(data.created_at)
            : data.created_at.toString(),
        updated_at:
          data.updated_at instanceof Timestamp
            ? convertToISODate(data.updated_at)
            : data.updated_at.toString(),
      } as IIPOSchema;
    });
    const visible = snapshot.docs[snapshot.docs.length - 1].id;
    return { companies: companyList, lastVisible: visible };
  } catch (e) {
    console.error("Error initializing Firebase SDK:", e);
    return null;
  }
};

// export const fetchCompanyIPOByIdAPI = async (companyId: string) => {
//   try {
//     const ipoRef = collection(db, "ipos");
//     const ipoQuery = query(ipoRef, where("id", "==", companyId));

//     const snapshot = await getDocs(ipoQuery);

//     if (snapshot.empty) {
//       console.log("No IPO found for this Company!");
//       return null;
//     }

//     const ipoData = snapshot.docs[0].data();
//     return {
//       id: snapshot.docs[0].id,
//       ...ipoData,
//       created_at:
//         ipoData.created_at instanceof Timestamp
//           ? convertToISODate(ipoData.created_at)
//           : ipoData.created_at.toString(),
//       updated_at:
//         ipoData.updated_at instanceof Timestamp
//           ? convertToISODate(ipoData.updated_at)
//           : ipoData.updated_at.toString(),
//     } as IIPOSchema;
//   } catch (error) {
//     console.error("Error fetching company's IPO by ID:", error);
//     return null;
//   }
// };

export const fetchCompanyIPOByIdAPI = async (companyId: string) => {
  try {
    const companyRef = doc(db, "ipos", companyId);
    const snapshot = await getDoc(companyRef);
    if (!snapshot.exists()) {
      console.log("Document does not exist!");
      return null;
    }
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      created_at:
        data.created_at instanceof Timestamp
          ? convertToISODate(data.created_at)
          : data.created_at.toString(),
      updated_at:
        data.updated_at instanceof Timestamp
          ? convertToISODate(data.updated_at)
          : data.updated_at.toString(),
    } as IIPOSchema;
    // return snapshot.data() as ICompanySchema;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return null;
  }
};
