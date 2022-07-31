import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const buttonList = [
  { label: "show TODO list", linkUrl: "/todo" },
  { label: "add TODO", linkUrl: "/todo/add" },
];

export const HomePageLinks = () => {
  const navigate = useNavigate();

  const onClickHanlder = (link) => {
    return () => {
      navigate(link);
    };
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {buttonList.map((item) => (
          <Grid item xs={12} md={6} key={item.linkUrl}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={onClickHanlder(item.linkUrl)}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
