import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompanyIPObyId } from "@/store/thunkService/ipo.thunkService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useCompanyDetailsController = () => {
  const dispatch = useAppDispatch();
  const { isIPODataError, isIPODataLoading, IPOData } = useAppSelector(
    (state) => state.IPO
  );
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyIPObyId(companyId));
    }
  }, [dispatch, companyId]);
  return {
    isIPODataError,
    isIPODataLoading,
    IPOData,
  };
};

export default useCompanyDetailsController;
