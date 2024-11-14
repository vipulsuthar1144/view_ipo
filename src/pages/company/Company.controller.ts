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

  const [filterStatus, setFilterStatus] = React.useState<"all" | "active" | "inactive">("all");

  React.useEffect(() => {
    dispatch(fetchCompaniesList({ pageSize: 100, fetchType: filterStatus }));
  }, [filterStatus]);

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
    filterStatus,
    setFilterStatus,
  };
};
export default useCompanyController;
