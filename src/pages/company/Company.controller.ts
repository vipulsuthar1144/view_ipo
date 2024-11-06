import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompaniesList } from "@/store/thunkService/ipo.thunkService";
import React from "react";
import { useNavigate } from "react-router-dom";

const useCompanyController = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isCompaniesListLoading, isCompaniesListError, companiesList, companyLastVisible } = useAppSelector(
    (state) => state.IPO
  );

  React.useEffect(() => {
    dispatch(fetchCompaniesList({ pageSize: 50 }));
  }, []);

  // const loadMore = () => {
  //   dispatch(
  //     fetchCompaniesList({ pageSize: 20, lastVisible: companyLastVisible })
  //   );
  // };
  const listenerGoToCompanyDetails = (companyId?: string) => {
    companyId && navigate(`/ipo/${companyId}`);
  };
  const listenerGoToAddIPO = () => {
    navigate(`/ipo/add`);
  };
  return {
    listenerGoToCompanyDetails,
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
    listenerGoToAddIPO,
  };
};
export default useCompanyController;
