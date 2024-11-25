import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import AppTopbar from "@components/AppTopbar";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { localstorageKeys } from "@utils/contant";
import { Navigate, Outlet } from "react-router-dom";
import AppColors from "../theme/utils/AppColors";

const AppLayout = () => {
  const classes = useStyles();
  const [isLoggedIn] = useLocalStorage(localstorageKeys.IS_LOGGED_IN, "false");

  if (isLoggedIn == "false") {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <Box className={classes.root}>
      <AppTopbar />
      <Outlet />
    </Box>
  );
};

const useStyles = makeStyles((_: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: AppColors.primaryBgColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden auto",
  },
}));

export default AppLayout;
