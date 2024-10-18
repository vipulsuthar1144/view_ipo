import { TypographyOptions } from "@mui/material/styles/createTypography";
import { CSSProperties } from "react";

const sharedStyles: CSSProperties = {
  userSelect: "none",
  color: "text.primary",
};

export const typography: TypographyOptions = {
  h1: {
    fontSize: "35px",
    fontWeight: 900,
    ...sharedStyles,
  },
  h2: {
    fontSize: "30px",
    fontWeight: 800,
    ...sharedStyles,
  },
  h3: {
    fontSize: "24px",
    fontWeight: 600,
    ...sharedStyles,
  },
  h4: {
    fontSize: "21px",
    fontWeight: 600,
    ...sharedStyles,
  },
  h5: {
    fontSize: "18px",
    fontWeight: 500,
    ...sharedStyles,
  },
  h6: {
    fontSize: "15px",
    fontWeight: 500,
    ...sharedStyles,
  },
  body1: {
    fontSize: "15px",
    fontWeight: 400,
    ...sharedStyles,
  },
  body2: {
    fontSize: "13px",
    fontWeight: 400,
    ...sharedStyles,
  },
  subtitle1: {
    fontSize: "15px",
    fontWeight: 400,
    ...sharedStyles,
  },
  subtitle2: {
    fontSize: "13px",
    fontWeight: 400,
    ...sharedStyles,
  },
  button: {
    textTransform: "capitalize",
    fontWeight: 500,
    letterSpacing: "0.15px",
    userSelect: "none",
  },
  caption: {
    fontSize: "11px",
    ...sharedStyles,
  },
  overline: {
    fontSize: "11px",
    ...sharedStyles,
  },
};
