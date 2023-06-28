import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps
} from "@mui/material";
import { useField } from "@unform/core";
import { useContext, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DataContext from "@/contexts/DataContext";

type TVPassFieldProps = TextFieldProps & {
  name: string;
};

export function VPassField({ name, ...rest }: TVPassFieldProps): JSX.Element {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);

  const { requiredPassError } = useContext(DataContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  const handleKeyDown = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <TextField
      id={fieldName}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      error={!!(requiredPassError && !value)}
      helperText={requiredPassError && !value ? "Required field" : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...rest}
    />
  );
}
