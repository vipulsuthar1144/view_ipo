import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompaniesList } from "@/store/thunkService/company.thunkService";
import React from "react";
import { useNavigate } from "react-router-dom";

const useCompanyController = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
  } = useAppSelector((state) => state.company);

  React.useEffect(() => {
    companiesList.length == 0 && dispatch(fetchCompaniesList({ pageSize: 50 }));
  }, []);

  // const loadMore = () => {
  //   dispatch(
  //     fetchCompaniesList({ pageSize: 20, lastVisible: companyLastVisible })
  //   );
  // };
  const listenerGoToCompanyDetails = (companyId?: string) => {
    companyId && navigate(`/ipo/${companyId}`);
  };
  return {
    listenerGoToCompanyDetails,
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
  };
};
export default useCompanyController;
