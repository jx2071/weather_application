import "./App.css";
///import axios from "axios";
import { useEffect, useState } from "react";

import Items from "./Items";
import NavBar from "./NavBar";
import Selection from "./Selection.js";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

function App() {
  const [admin, setAdmin] = useState(false);
  const [selected, setSelected] = useState(
    window.sessionStorage.getItem("selected_items")
      ? JSON.parse(window.sessionStorage.getItem("selected_items"))
      : [[], [], [], [], [], [], [], [], []]
  );

  const handleDelete = (id) => {
    selected[id - 1][3] = selected[id - 1][3] - 1;
    if (selected[id - 1][3] === 0) {
      selected[id - 1] = [];
    }
    window.sessionStorage.setItem("selected_items", JSON.stringify(selected));
    setSelected(selected);
  };

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
              <Item style={{ fontSize: "2rem" }}>Inventory</Item>
              <Items
                onAdd={(data) => {
                  setSelected(data);
                }}
              />
            </Grid>
          </Grid>
          <Grid container xs={4}>
            <Grid xs={12}>
              <Item style={{ fontSize: "2rem" }}>Selections</Item>
              <Selection
                data={selected}
                onDelete={(id) => {
                  handleDelete(id);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
