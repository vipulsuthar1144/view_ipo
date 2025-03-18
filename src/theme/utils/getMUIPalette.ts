import { Theme, ThemeOptions } from "@mui/material";
import { typography } from "./typography";
import { getMuiInputBase } from "./InputBase";

export const getMUIPalette = (theme: Theme): ThemeOptions => {
  return {
    palette: {
      mode: "light",
      ...theme,
    },
    components: {
      ...getMuiInputBase(theme),
    },
    typography,
  };
};
