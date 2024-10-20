import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCompaniesList } from "@/store/thunkService/company.thunkService";
import React from "react";

const useCompanyController = () => {
  const dispatch = useAppDispatch();
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
  return {
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
  };
};
export default useCompanyController;
