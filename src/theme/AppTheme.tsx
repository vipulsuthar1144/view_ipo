import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import React, { useMemo } from "react";
import { getMUIPalette } from "./utils/getMUIPalette";

interface IAppThemeProps {
  children?: React.ReactNode;
}

const AppTheme = ({ children }: IAppThemeProps) => {
  let theme = createTheme();
  const appTheme = useMemo(() => {
    theme = deepmerge(theme, getMUIPalette(theme));
    theme = responsiveFontSizes(theme);
    return theme;
  }, [theme]);

  return (
    <ThemeProvider theme={appTheme}>
      {/* <CssBaseline enableColorScheme /> */}
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
