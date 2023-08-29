import DataContext from "@/contexts/DataContext";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useContext, useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
  name: string;
};
export function VTextField({ name, ...rest }: TVTextFieldProps): JSX.Element {
  const { fieldName, registerField, defaultValue } = useField(name);

  const [value, setValue] = useState(defaultValue || "");

  const { requiredTextError } = useContext(DataContext);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={!!(requiredTextError && !value)}
      helperText={requiredTextError && !value ? "Required field" : ""}
    />
  );
}
