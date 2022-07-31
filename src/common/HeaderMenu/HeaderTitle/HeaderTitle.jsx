import React from "react";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

export const HeaderTitle = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <>
      {/* for PC size. */}
      <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={clickHandler}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        TODO SAMPLE
      </Typography>
      {/* for SmartPhone size */}
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={clickHandler}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        TODO SAMPLE
      </Typography>
    </>
  );
};
