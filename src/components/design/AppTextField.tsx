import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";

type IAppTextFieldProps = TextFieldProps & {
  label?: string;
  name: string; // Make `name` required to work with react-hook-form
  hasAddIcon?: boolean;
  onAddClick?: () => void;
};

const AppTextField = ({
  id,
  label,
  name,
  variant = "outlined",
  type = "text",
  multiline = false,
  minRows = 1,
  hasAddIcon = false,
  onChange,
  onAddClick,
  ...rest
}: IAppTextFieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      variant={variant}
      multiline={multiline}
      minRows={minRows}
      type={type}
      onChange={onChange}
      fullWidth
      autoComplete="off"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {hasAddIcon && (
                <IconButton onClick={onAddClick}>
                  <AddCircleOutline color="success" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
};

export default AppTextField;
