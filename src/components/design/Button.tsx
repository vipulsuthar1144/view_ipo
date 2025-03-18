import { Box, Button, CircularProgress, SxProps, Theme } from "@mui/material";

export interface IGlobalButtonProps {
  label: string;
  sublabel?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: (e: any) => void;
  style?: SxProps<Theme>;
  type?: "submit" | "reset";
  startIcon?: React.ReactElement;
}
export interface ILoaderButtonProps extends IGlobalButtonProps {
  variant: "text" | "outlined" | "contained";
  color: "primary" | "success" | "secondary";
  loading?: boolean;
  mt?: string;
}

export const LoaderButton = ({
  variant,
  color,
  type,
  onClick,
  label,
  loading = false,
  style,
  startIcon,
  mt = "0px",
  disabled = false,
}: ILoaderButtonProps) => {
  const buttonType = type === "reset" || type === "submit" ? type : "button";
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        mt: mt,
      }}
    >
      <Button
        startIcon={startIcon}
        variant={variant}
        color={color}
        disabled={loading || disabled}
        type={buttonType}
        onClick={onClick}
        sx={{
          cursor: loading ? "not-allowed" : "pointer",
          ...style,
        }}
      >
        {label}
      </Button>
      {loading && <CircularProgress size={24} thickness={5} sx={{ color: "primary.main", position: "absolute" }} />}
    </Box>
  );
};
