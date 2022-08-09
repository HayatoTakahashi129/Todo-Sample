import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = [
  { title: "Add Todo", link: "/todo/add" },
  { title: "TodoList", link: "/todo" },
];
export const PageMenu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickMenuItem = (link) => () => {
    navigate(link);
    setAnchorElNav(null);
  };
  return (
    <>
      {/* for PC size */}
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            onClick={handleClickMenuItem(page.link)}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
      {/* for SmartPhone size */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.title} onClick={handleClickMenuItem(page.link)}>
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};
