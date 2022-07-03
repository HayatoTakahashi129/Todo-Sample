import React from "react";
import TextField from "@mui/material/TextField";

const EmailInput = (props) => {
  const { register, error } = props;

  return (
    <TextField
      id="email"
      label="E-mail"
      type="email"
      variant="standard"
      {...register}
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};

export default EmailInput;
