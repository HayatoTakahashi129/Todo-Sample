import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";

const buttonList = [
  { label: "show TODO list", linkUrl: "/todos" },
  { label: "add TODO", linkUrl: "/todos/add" },
];

export const HomePageLinks = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {buttonList.map((item) => (
          <Grid item xs={12} md={6} key={item.linkUrl}>
            <Button fullWidth size="large" variant="contained">
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
