import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";
import AppColors from "../theme/utils/AppColors";
import AppTopbar from "@components/AppTopbar";

const AppLayout = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppTopbar />
      <Outlet />
    </Box>
  );
};

const useStyles = makeStyles((_: Theme) => ({
  root: {
    height: "100vh",
    backgroundColor: AppColors.primaryBgColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default AppLayout;
