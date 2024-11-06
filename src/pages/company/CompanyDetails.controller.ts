import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteIPObyId, fetchCompanyIPObyId } from "@/store/thunkService/ipo.thunkService";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useCompanyDetailsController = () => {
  const dispatch = useAppDispatch();
  const { isIPODataError, isIPODataLoading, IPOData, isCRUDIPOError, isCRUDIPOLoading } = useAppSelector(
    (state) => state.IPO
  );
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyIPObyId(companyId));
    }
  }, [dispatch, companyId]);

  const handleDeleteIPObyId = () => {
    dispatch(deleteIPObyId(companyId ?? "")).then(() => {
      if (!isCRUDIPOLoading && !isCRUDIPOError) navigate("/", { replace: true });
    });
  };

  const listenerGoToUpdateScreen = () => {
    companyId && navigate(`/ipo/${companyId}/update`);
  };
  return {
    isIPODataError,
    isIPODataLoading,
    IPOData,
    companyId,
    navigate,
    isCRUDIPOError,
    isCRUDIPOLoading,
    handleDeleteIPObyId,
    listenerGoToUpdateScreen,
  };
};

export default useCompanyDetailsController;
