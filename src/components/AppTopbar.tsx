import { imgLogo } from "@assets/images";
import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppColors from "../theme/utils/AppColors";
import ImageComp from "./design/Image";

const AppTopbar = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  // const [selectedItem, setSelectedItem] = useState<string | null>("/");
  // const location = useLocation();

  // useEffect(() => {
  //   setSelectedItem(location.pathname);
  // }, [location.pathname]);

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
      position="sticky"
      className={classes.appbar}
      sx={{
        backgroundColor: AppColors.white,
        backgroundImage: "none",
        boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
        zIndex: 1,
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
    // left: 0,
    maxWidth: "30em",
    width: "100%",
    height: "fit-content",
    borderRadius: "0px 0px 20px 20px",
    // height: "80px",
  },
  toolBar: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  menuContainer: {
    alignSelf: "center",
    height: "100%",
    paddingTop: "30px",
    margin: " 0 auto",
    // backgroundColor: "red",
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
