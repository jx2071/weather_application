import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Items from "./Items";
import NavBar from "./NavBar";
import Selection from "./Selection.js";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

function Home() {
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
  );
}

export default Home;
