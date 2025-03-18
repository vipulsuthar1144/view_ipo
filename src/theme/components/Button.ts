/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, ComponentsProps, ComponentsOverrides, ComponentsVariants } from "@mui/material";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    elevated: true;
    filled: true;
    tonal: true;
    outlined: true;
    text: true;
    contained: true;
    gradient: true;
  }
  interface ButtonPropsColorOverrides {
    tertiary: true;
    surface: true;
  }
}

interface MButton {
  MuiButton: {
    defaultProps?: ComponentsProps["MuiButton"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiButton"];
    variants?: ComponentsVariants["MuiButton"];
  };
}

export const getButton = (theme: Theme): MButton => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          cursor: "pointer",
          padding: "12px 24px",
          boxSizing: "border-box",
          // marginLeft: 1.5,
          // padding: "6px 20px",
          fontSize: "14px",
          transition: `transform 0.2s ease`,
          // "&:hover": {
          //   transform: "scale(1.05)",
          // },
          // "&:active": {
          //   transform: "scale(1.01)",
          // },
          "&.Mui-disabled": {
            color: "inherit",
            backgroundColor: "inherit",
            opacity: 0.5,
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.primary.main,
              opacity: 0.7,
            },
          },
        },

        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.secondary.main,
              opacity: 0.7,
            },
          },
        },

        {
          props: { variant: "text" },
          style: {
            color: "inherit",
            borderRadius: "8px",
            textTransform: "none",
            padding: "5px 10px",
            boxSizing: "border-box",
            transition: `none`,
            "&:hover": {
              transform: "scale(1)",
              textDecoration: "underline",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
            // },
          },
        },
      ],
    },
  };
};
