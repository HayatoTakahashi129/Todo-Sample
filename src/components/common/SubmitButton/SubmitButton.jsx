import React from "react";
import { Button } from "@mui/material";

export const SubmitButton = (props) => {
  const { children } = props;
  return (
    <Button
      variant="contained"
      size="large"
      type="submit"
      fullWidth
      sx={{ mt: "2rem" }}
      formNoValidate
    >
      {children}
    </Button>
  );
};
