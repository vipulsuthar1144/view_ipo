import { db, userCollectionName } from "@/config/firebase.config";
import { logout } from "@/service/login.services";
import { toggleDialogConfimation } from "@/store/slice/dialog.slice";
import { setIPOIdForDelete, updateCompanyIPOActiveStatus } from "@/store/slice/ipo.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteIPObyId } from "@/store/thunkService/ipo.thunkService";
import { LoaderButton } from "@components/design/Button";

import { Close, DeleteForever, HourglassTop, Logout, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

const DialogConfirmation = () => {
  const [dialogData, setDialogData] = React.useState({
    dialogTitle: "Logout",
    dialogMessage: "are you sure you want to logout?",
  });
  const handleDialogData = () => {
    switch (dialogConfimationAction) {
      case "logout": {
        setDialogData({
          dialogTitle: "Logout",
          dialogMessage: "are you sure you want to logout?",
        });
        break;
      }
      case "change_status_ipo": {
        setDialogData({
          dialogTitle: "IPO Status",
          dialogMessage: "Are you sure you want to change the IPO Status?",
        });
        break;
      }
      case "delete_ipo": {
        setDialogData({
          dialogTitle: "Delete IPO",
          dialogMessage: "Are you sure you want to delete this IPO?",
        });
        break;
      }
    }
  };
  const renderICON = () => {
    switch (dialogConfimationAction) {
      case "logout": {
        return <Logout color="primary" />;
      }
      case "change_status_ipo": {
        return <HourglassTop />;
      }
      case "delete_ipo": {
        return <DeleteForever color="error" />;
      }
    }
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openDialogConfimation, dialogConfimationAction } = useAppSelector((state) => state.dialog);
  const { isIPOActive } = useAppSelector((state) => state.IPO);
  const { ipoIdForDelete } = useAppSelector((state) => state.IPO);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleCloseDialog = () => {
    setIsSecurityCodeError(false);
    setSecurityCode("");
    setShowPassword(false);
    dispatch(toggleDialogConfimation(false));
  };

  const handleConfirm = () => {
    switch (dialogConfimationAction) {
      case "logout": {
        handleCloseDialog();
        logout();
        break;
      }
      default: {
        handleVerifySecurityCode();
      }
    }
  };

  const [isSecurityCodeVerifying, setIsSecurityCodeVerifying] = React.useState(false);
  const [isSecurityCodeError, setIsSecurityCodeError] = React.useState(false);
  const [securityCode, setSecurityCode] = React.useState("");

  const handleVerifySecurityCode = async () => {
    try {
      if (!securityCode.trim()) return;
      setIsSecurityCodeVerifying(true);
      setIsSecurityCodeError(false);

      let q = query(collection(db, userCollectionName), where("role", "==", "admin"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setIsSecurityCodeError(true);
        return;
      }
      const user = snapshot.docs[0].data();

      if (!user.security_code) {
        setIsSecurityCodeError(true);
        return;
      }

      bcrypt
        .compare(securityCode, user.security_code)
        .then((res) => {
          if (res == false) {
            setIsSecurityCodeError(true);
            return;
          }
          setIsSecurityCodeError(false);
          setSecurityCode("");
          switch (dialogConfimationAction) {
            case "delete_ipo": {
              handleDeleteIPO();
              break;
            }
            case "change_status_ipo": {
              handleActiveStatusChange();
              break;
            }
          }
          handleCloseDialog();
        })
        .catch((err) => {
          console.error(err);
          setIsSecurityCodeError(true);
        });
    } catch (error) {
      console.error(error);
      setIsSecurityCodeError(true);
    } finally {
      setIsSecurityCodeVerifying(false);
    }
  };

  const handleActiveStatusChange = () => {
    dispatch(updateCompanyIPOActiveStatus(!isIPOActive));
  };

  const handleDeleteIPO = () => {
    ipoIdForDelete &&
      dispatch(deleteIPObyId(ipoIdForDelete)).then(() => {
        dispatch(setIPOIdForDelete(""));
        navigate("/", { replace: true });
      });
  };

  React.useEffect(() => {
    handleDialogData();
  }, [dialogConfimationAction]);
  return (
    <Dialog
      onClose={handleCloseDialog}
      open={openDialogConfimation}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        "& .MuiPaper-root": {
          backgroundColor: "white",
          boxShadow: "none",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "90%",
        },
      }}
    >
      <DialogTitle id="customized-dialog-title">
        <Stack flexDirection={"row"} gap={"10px"}>
          {renderICON()}
          <Typography variant="h4">{dialogData.dialogTitle}</Typography>
        </Stack>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent
        dividers
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.primary.main}`,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        })}
      >
        <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
          {dialogData.dialogMessage}
        </Typography>
        {dialogConfimationAction != "logout" && (
          <TextField
            label="Security Code"
            fullWidth
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            value={securityCode}
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target;
              setIsSecurityCodeError(false);
              setSecurityCode(value);
            }}
            error={isSecurityCodeError}
            helperText={isSecurityCodeError ? "Invalid Security Code" : null}
            sx={{
              // mb: "15px",
              mt: "20px",
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ padding: "15px 5px" }}>
        <Stack direction={"row"} gap={"0px"}>
          <Button onClick={handleCloseDialog} variant="text" color="secondary" sx={{ padding: "3px 20px" }}>
            Cancel
          </Button>

          <LoaderButton
            loading={isSecurityCodeVerifying}
            disabled={dialogConfimationAction != "logout" ? !securityCode : false}
            variant="contained"
            onClick={handleConfirm}
            color="primary"
            label="Confirm"
            style={{
              padding: "5px 20px",
              borderRadius: "6px",
            }}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmation;
