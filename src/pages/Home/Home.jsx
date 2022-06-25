import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import HeaderMenu from "../../common/HeaderMenu/HeaderMenu";
import { HomePageLinks } from "../../components/Home/HomePageLinks/HomePageLinks";
import { Welcome } from "../../components/Home/Welcome/Welcome";

const Home = () => {
  return (
    <div>
      <HeaderMenu />
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
