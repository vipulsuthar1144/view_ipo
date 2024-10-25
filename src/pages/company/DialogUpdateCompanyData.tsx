import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AppColors from "@/theme/utils/AppColors";
import { Save } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogUpdateCompanyData() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        fullWidth
        disableScrollLock
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: AppColors.white,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: AppColors.greenColor }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4">
              Company Name
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Save />}
              sx={{
                borderRadius: "50px",
                color: AppColors.greenColor,
                borderColor: AppColors.greenColor,
              }}
              onClick={handleClose}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: "20px" }}>
          <TextField
            label="Company Name"
            variant="outlined"
            sx={{ color: "red" }}
            error={true} // Triggers error styles
            helperText={"fuck you"}
            fullWidth
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
