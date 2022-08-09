import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import { UserMenu } from "./UserMenu/UserMenu";
import { PageMenu } from "./PageMenu/PageMenu";
import { HeaderTitle } from "./HeaderTitle/HeaderTitle";

const HeaderMenu = () => {
  return (
    <AppBar position="static" sx={{ mb: "2.4rem" }}>
      <Container maxWidth="xl">
        {/* for SmartPhone Size. */}
        <Toolbar disableGutters sx={{ display: { xs: "flex", md: "none" } }}>
          <PageMenu />
          <HeaderTitle />
          <UserMenu />
        </Toolbar>
        {/* for PC size. */}
        <Toolbar disableGutters sx={{ display: { xs: "none", md: "flex" } }}>
          <HeaderTitle />
          <PageMenu />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderMenu;
