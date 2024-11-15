import { imgLogo } from "@assets/images";
import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppColors from "../theme/utils/AppColors";
import ImageComp from "./design/Image";
import { useLocation } from "react-router-dom";

const AppTopbar = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  // const [selectedItem, setSelectedItem] = useState<string | null>("/");
  const location = useLocation();

  // const menuItems = [
  //   { id: "/", name: "Companies" },
  //   { id: "/ipo/jaiho", name: "IPO's" },
  // ];

  // const handleSwitchRoute = (route: string) => {
  //   if (selectedItem !== route) {
  //     setSelectedItem(route);
  //     navigate(route);
  //   }
  // };

  return (
    <AppBar
      position="fixed"
      className={classes.appbar}
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        zIndex: 10,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        // display: location.pathname.includes("/update") || location.pathname.includes("/add") ? "none" : "flex",
      }}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }} className={classes.toolBar}>
        <ImageComp
          img={imgLogo}
          alt="IPO"
          style={{
            width: "80px",
            aspectRatio: 1,
          }}
        />
        {/* <Box className={classes.menuContainer}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              className={classes.menuItems}
              onClick={() => handleSwitchRoute(item.id)}
              style={{
                backgroundColor:
                  selectedItem == item.id
                    ? AppColors.primaryBgColor
                    : "transparent",
                height: "100%",
                width: "100px",
                color: AppColors.textPrimary,
                fontSize: "14px",
                fontWeight: 600,
                // letterSpacing: "0.15px",
                padding: "10px 15px",
                borderRadius: "10px 10px 0 0",
                // transition: `backgroundColor ease 1s`,
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() => ({
  appbar: {
    top: 0,
    left: 0,
    width: "100%",
  },
  toolBar: {
    maxWidth: "30em",
    width: "100%",
    height: "fit-content",
    borderRadius: "0px 0px 20px 20px",
    display: "flex",
    justifyContent: "center",
    // position: "relative",
    backgroundColor: AppColors.white,
    backgroundImage: "none",
    boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
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
