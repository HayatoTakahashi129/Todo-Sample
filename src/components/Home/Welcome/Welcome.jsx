import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export const Welcome = () => {
  const username = useSelector((state) => state.user.userInfo.nickname);
  return (
    <Typography variant="h2" component="h2" align="center">
      Welcome {username}
      <br />
      to
      <br /> TODO SAMPLE
    </Typography>
  );
};
