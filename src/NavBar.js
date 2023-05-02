import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Inventory", "Bundles", "Orders"];

function NavBar(props) {
  const setAdmin = props.onLogin;
  const admin = props.admin;
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "2rem",
            }}
          >
            Inventory Management
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={"/" + page.toLowerCase()}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {admin ? (
            <span>
              Welcome Admin,
              <Button color="inherit" onClick={setAdmin}>
                Logout
              </Button>
            </span>
          ) : (
            <Button color="inherit" onClick={setAdmin}>
              Admin Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
