import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

export const DateTimeInput = (props) => {
  const { id, label, register, errors, onChange } = props;
  const [dateTime, setDateTime] = useState("");

  const changeHandler = (value) => {
    setDateTime(value);
    if (onChange) onChange(value);
  };

  const regsiterHandler = (event) => {
    let registDate = event.target?.value.replace(" ", "T");
    registDate = registDate.replaceAll("/", "-");
    registDate += ":00+09:00";
    event.target.value = registDate;
    register.onChange(event);
  };

  return (
    <DateTimePicker
      label={label}
      value={dateTime}
      onChange={changeHandler}
      inputFormat="yyyy/MM/dd HH:mm"
      renderInput={(prop) => (
        <TextField
          id={id}
          {...prop}
          {...register}
          onChange={regsiterHandler}
          onBlur={regsiterHandler}
          variant="standard"
          error={Boolean(errors)}
          helperText={errors?.message}
        />
      )}
    />
  );
};
