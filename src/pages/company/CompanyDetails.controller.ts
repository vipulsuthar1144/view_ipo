import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompanyById } from "@/store/thunkService/company.thunkService";
import { fetchCompanyIPObyId } from "@/store/thunkService/ipo.thunkService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useCompanyDetailsController = () => {
  const dispatch = useAppDispatch();
  const { isIPODataError, isIPODataLoading, IPOData } = useAppSelector(
    (state) => state.IPO
  );
  const { isCompanyDataError, isCompanyDataLoading, CompanyData } =
    useAppSelector((state) => state.company);
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId) {
      // dispatch(fetchCompanyById("3RddcqufNqXaXs0iigq4"))
      dispatch(fetchCompanyById(companyId))
        .unwrap()
        .then((companyData) => {
          companyData?.id && dispatch(fetchCompanyIPObyId(companyData.id));
        });
    }
  }, [dispatch, companyId]);
  return {
    isIPODataError,
    isIPODataLoading,
    IPOData,
    isCompanyDataError,
    isCompanyDataLoading,
    CompanyData,
  };
};

export default useCompanyDetailsController;
