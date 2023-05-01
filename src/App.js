import "./App.css";
///import axios from "axios";
import { useEffect, useState } from "react";

import Items from "./Items";
import NavBar from "./NavBar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

function App() {
  const [admin, setAdmin] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <NavBar
          onLogin={() => {
            setAdmin(!admin);
            console.log("Logged in as admin");
          }}
          admin={admin}
        />
        <Grid container spacing={2}>
          <Grid container xs={8}>
            <Grid xs={12}>
              <Item>Inventory</Item>
              <Items />
            </Grid>
          </Grid>
          <Grid container xs={4}>
            <Grid xs={12}>
              <Item>Selections</Item>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
