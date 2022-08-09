import React from "react";
import TextField from "@mui/material/TextField";

export const PasswordInput = (props) => {
  const { register, error } = props;
  return (
    <TextField
      id="password"
      label="Password"
      type="password"
      variant="standard"
      name="password"
      {...register}
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};
