import { db, ipoCollectionName } from "@/config/firebase.config";
import { IIPOSchema } from "@/schema/ipo.schema";
import { getAuth } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./login.services";

const ITEMS_PER_PAGE = 20;

const useIPOs = () => {
  const [ipos, setIPOs] = useState<IIPOSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const navigate = useNavigate();

  const fetchIPOs = async (isInitial = false, status: "all" | "active" | "inactive" = "all") => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        logout();
      }
      setLoading(true);
      setError(null);
      let q = query(collection(db, ipoCollectionName), orderBy("created_at", "desc"), limit(ITEMS_PER_PAGE));

      if (status != "all") {
        q = query(q, where("is_active", "==", status == "active"));
      }

      if (!isInitial && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);

      const newIPOs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          created_at: data.created_at instanceof Timestamp ? data.created_at.toDate().toISOString() : data.created_at,
          updated_at: data.updated_at instanceof Timestamp ? data.updated_at.toDate().toISOString() : data.updated_at,
          timeline: data.timeline
            ? {
                ...data.timeline,
                open_date:
                  data.timeline.open_date instanceof Timestamp
                    ? data.timeline.open_date.toDate().toISOString()
                    : data.timeline.open_date,
                end_date:
                  data.timeline.end_date instanceof Timestamp
                    ? data.timeline.end_date.toDate().toISOString()
                    : data.timeline.end_date,
                allotment_date:
                  data.timeline.allotment_date instanceof Timestamp
                    ? data.timeline.allotment_date.toDate().toISOString()
                    : data.timeline.allotment_date,
                listing_date:
                  data.timeline.listing_date instanceof Timestamp
                    ? data.timeline.listing_date.toDate().toISOString()
                    : data.timeline.listing_date,
              }
            : undefined,
        } as IIPOSchema;
      });

      if (isInitial) {
        setIPOs(newIPOs);
      } else {
        setIPOs((prev) => [...prev, ...newIPOs]);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err : new Error("Failed to fetch IPOs"));
    } finally {
      setLoading(false);
    }
  };

  const filterIPOs = (activeStatus: "all" | "active" | "inactive" = "all") => {
    setFilterStatus(activeStatus);
    setError(null);
    setIPOs([]);
    setLastDoc(null);
    setHasMore(true);
    fetchIPOs(true, activeStatus);
  };

  useEffect(() => {
    fetchIPOs(true);
  }, []);

  const listenerGoToCompanyDetails = (companyId?: string) => {
    companyId && navigate(`/ipo/${companyId}`);
  };
  const listenerGoToAddIPO = () => {
    navigate(`/ipo/add`);
  };
  const loadMore = () => fetchIPOs(false, filterStatus);

  return {
    ipos,
    loading,
    error,
    hasMore,
    loadMore,
    filterIPOs,
    listenerGoToCompanyDetails,
    listenerGoToAddIPO,
    filterStatus,
    setFilterStatus,
  };
};

export default useIPOs;
