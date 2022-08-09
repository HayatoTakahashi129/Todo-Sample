import React from "react";
import TextField from "@mui/material/TextField";

export const NicknameInput = (props) => {
  const { register, error } = props;

  return (
    <TextField
      id="nickname"
      label="Nickname"
      variant="standard"
      {...register}
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};
