import { updateCompanyIPOActiveStatus } from "@/store/slice/ipo.slice";
import { useAppDispatch } from "@/store/store";
import { Stack, Switch, Typography } from "@mui/material";
import React from "react";

type IsActiveSwitchProps = {
  isActive?: boolean;
};

const IsActiveSwitch = ({ isActive = true }: IsActiveSwitchProps) => {
  const [checked, setChecked] = React.useState(isActive);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(updateCompanyIPOActiveStatus(checked));
    }, 500);

    return () => clearTimeout(timeout);
  }, [checked]);

  return (
    <Stack direction={"row"} alignItems={"center"} mt={"10px"}>
      <Typography variant="h6">Active : </Typography>
      <Switch checked={checked} onChange={handleChange} color="primary" inputProps={{ "aria-label": "Active" }} />
    </Stack>
  );
};

export default IsActiveSwitch;
