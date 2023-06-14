import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type TVPassFieldProps = TextFieldProps & {
  name: string;
};

export function VPassField({ name, ...rest }: TVPassFieldProps): JSX.Element {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  const handleKeyDown = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <FormControl error={!!error} required sx={{ width: '100%' }} variant="outlined" margin="normal">
      <InputLabel htmlFor={fieldName}>Password</InputLabel>
      <OutlinedInput
        id={fieldName}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        endAdornment={
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
        }
        label="Password"
        fullWidth={rest.fullWidth}
        required={rest.required}
      />
      {error && <p>{error}</p>}
    </FormControl>
  );
}
