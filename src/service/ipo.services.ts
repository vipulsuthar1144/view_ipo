import { collectionName, db } from "@/config/firebase.config";
import { IIPOSchema } from "@/schema/ipo.schema";
import { convertToISODate } from "@utils/genaralFunctions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export const fetchCompaniesListAPI = async ({
  pageSize,
  lastVisible,
  fetchType = "all",
}: {
  pageSize: number;
  lastVisible?: string | null;
  fetchType: "all" | "active" | "inactive";
}) => {
  try {
    const companyCollection = collection(db, collectionName);
    console.log(lastVisible);
    let queryParams;
    // if (lastVisible) {
    //   queryParams = query(
    //     companyCollection,
    //     // orderBy("created_at", "desc"),
    //     startAfter(`${lastVisible}`),
    //     // startAfter(`JT5ZpMlqVb7mj4SqmFoj`),
    //     limit(pageSize)
    //   );
    // } else {
    if (fetchType == "all") {
      queryParams = query(companyCollection, orderBy("created_at", "desc"), limit(pageSize));
    } else {
      queryParams = query(companyCollection, where("is_active", "==", fetchType == "active"), limit(pageSize));
    }
    // }
    // queryParams = query(companyCollection, orderBy("created_at", "desc"), limit(10));

    const snapshot = await getDocs(queryParams);
    console.log(snapshot);

    // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const companyList = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at:
          data.created_at instanceof Timestamp ? convertToISODate(data.created_at) : data.created_at.toString(),
        updated_at:
          data.updated_at instanceof Timestamp ? convertToISODate(data.updated_at) : data.updated_at.toString(),
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
    const companyRef = doc(db, collectionName, companyId);
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
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return null;
  }
};

export const deleteIPObyIdAPI = async (id: string) => {
  try {
    const ipoRef = doc(db, collectionName, id);
    await deleteDoc(ipoRef);
    console.log("IPO deleted successfully!");
  } catch (error) {
    console.error("Error deleting IPO:", error);
  }
};

export const addIPOAPI = async (data: IIPOSchema) => {
  try {
    console.log("data for add: ", data);

    const ipoRef = collection(db, collectionName);
    const ipoDoc = await addDoc(ipoRef, { ...data, created_at: Timestamp.now(), updated_at: Timestamp.now() });
    console.log("IPO added successfully with ID: ", ipoDoc.id);
  } catch (error) {
    console.error("Error adding IPO:", error);
  }
};

export const updateIPOAPI = async (id: string, data: IIPOSchema) => {
  try {
    console.log("data for update: ", data);

    const ipoRef = doc(db, collectionName, id);
    await updateDoc(ipoRef, { ...data, updated_at: Timestamp.now() });
    console.log("IPO updated successfully!");
  } catch (error) {
    console.error("Error updating IPO:", error);
  }
};
