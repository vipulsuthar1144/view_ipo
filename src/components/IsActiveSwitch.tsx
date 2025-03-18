import { setDialogConfimationAction, toggleDialogConfimation } from "@/store/slice/dialog.slice";
import { updateCompanyIPOActiveStatus } from "@/store/slice/ipo.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Stack, Switch, Typography } from "@mui/material";
import React from "react";

type IsActiveSwitchProps = {
  isActive?: boolean;
};

const IsActiveSwitch = ({ isActive = false }: IsActiveSwitchProps) => {
  const dispatch = useAppDispatch();
  const { isIPOActive } = useAppSelector((state) => state.IPO);

  const handleChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDialogConfimationAction("change_status_ipo"));
    dispatch(toggleDialogConfimation(true));
  };

  React.useEffect(() => {
    dispatch(updateCompanyIPOActiveStatus(isActive));
  }, [isActive]);

  return (
    <Stack direction={"row"} alignItems={"center"} mt={"10px"}>
      <Typography variant="h6">Active : </Typography>
      <Switch checked={isIPOActive} onChange={handleChange} color="primary" inputProps={{ "aria-label": "Active" }} />
    </Stack>
  );
};

export default IsActiveSwitch;
