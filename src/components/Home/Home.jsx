import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { HomePageLinks } from "./components/HomePageLinks/HomePageLinks";
import { Welcome } from "./components/Welcome/Welcome";

const Home = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Welcome />
          <HomePageLinks />
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
