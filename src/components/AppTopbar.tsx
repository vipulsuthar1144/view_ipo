import { setDialogConfimationAction, toggleDialogConfimation } from "@/store/slice/dialog.slice";
import { useAppDispatch } from "@/store/store";
import { imgLogo } from "@assets/images";
import { Logout } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppColors from "../theme/utils/AppColors";
import ImageComp from "./design/Image";

const AppTopbar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appbar}
        sx={{
          backgroundColor: "primary.main",
          backgroundImage: "none",
          // boxShadow: "none",
          zIndex: 10,
          top: 0,
          padding: "5px 10px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <Toolbar className={classes.toolBar}>
          <ImageComp
            img={imgLogo}
            alt="IPO"
            style={{
              width: "50px",
              aspectRatio: 1,
            }}
          />

          <Button
            startIcon={<Logout />}
            onClick={() => {
              dispatch(setDialogConfimationAction("logout"));
              dispatch(toggleDialogConfimation(true));
            }}
            variant="text"
            color="primary"
            sx={{ fontSize: "16px" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

const useStyles = makeStyles(() => ({
  appbar: {
    top: 0,
    left: 0,
    width: "100%",
  },
  toolBar: {
    maxWidth: "90em",
    width: "100%",
    height: "fit-content",
    borderRadius: "0px 0px 20px 20px",
    display: "flex",
    justifyContent: "space-between",
    // position: "relative",
    // backgroundColor: AppColors.white,
    // backgroundImage: "none",
    // boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
  },
  menuContainer: {
    alignSelf: "center",
    height: "100%",
    paddingTop: "30px",
    margin: " 0 auto",
    // backgroundColor: "red",
    display: "flex",
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    gap: "0px",
  },
  menuItems: {
    height: "100%",
    width: "100px",
    color: AppColors.textPrimary,
    fontSize: "14px",
    fontWeight: 600,
    // letterSpacing: "0.15px",
    padding: "10px 15px",
    borderRadius: "10px 10px 0 0",
    // transition: `backgroundColor ease 1s`,
  },
}));

export default AppTopbar;
