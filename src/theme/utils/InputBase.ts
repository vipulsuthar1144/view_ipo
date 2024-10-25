import {
  Theme,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants,
} from "@mui/material";
import AppColors from "./AppColors";

interface MFormLabel {
  MuiInputBase: {
    defaultProps?: ComponentsProps["MuiInputBase"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiInputBase"];
    variants?: ComponentsVariants["MuiInputBase"];
  };
  MuiInputLabel: {
    defaultProps?: ComponentsProps["MuiInputLabel"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiInputLabel"];
    variants?: ComponentsVariants["MuiInputLabel"];
  };
}
export const getMuiInputBase = (_: Theme): MFormLabel => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: AppColors.textPrimary, // Default label color
          "&.Mui-focused": {
            color: AppColors.textPrimary, // Label color when focused
          },
          "&.Mui-disabled": {
            color: AppColors.textPrimary, // Label color when disabled
          },
          "&.Mui-error": {
            color: AppColors.textPrimary, // Label color when error
          },
          "&.Mui-filled": {
            color: AppColors.textPrimary, // Label color when filled
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          backgroundColor: "sidebar.main",
          maxHeight: "50px",
          padding: "0px",
          borderRadius: "25px",
          color: AppColors.textPrimary,
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: `1px solid ${AppColors.textPrimary}`,
            },
            borderRadius: "10px",
            notchedOutline: {},
          },
          "&:hover": {
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                border: `2px solid ${AppColors.textPrimary}`,
                // top: -2,
              },
            },
          },
          "&.Mui-focused": {
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                border: `2px solid ${AppColors.textPrimary}`,
              },
            },
          },
        },
        input: {
          "&:has(> input:-webkit-autofill)": {
            backgroundColor: "transparent",
          },
          "&:before, :after, :hover:not(.Mui-disabled):before": {
            borderBottom: 0,
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       border: "1px solid white",
    //       borderRadius: "15px",
    //       padding: "0px",
    //       "&.MuiOutlinedInput-input": {
    //         color: "white",
    //         padding: "0px",
    //       },
    //     },
    //     input: {
    //       color: "white",
    //       borderColor: "white",
    //       padding: "0px",
    //       "&::before": {
    //         borderBottom: "1px solid rgba(0, 0, 0, 0.42)", // use your color
    //       },
    //     },
    //   },
    // },
  };
};
