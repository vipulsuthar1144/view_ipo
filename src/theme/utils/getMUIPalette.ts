import { Theme } from "@emotion/react";
import { ThemeOptions } from "@mui/material";
import { typography } from "./typography";

export const getMUIPalette = (theme: Theme): ThemeOptions => {
  return {
    palette: {
      mode: "light",
      ...theme,
    },
    typography,
  };
};
