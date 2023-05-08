import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";

import Home from "./Home";
import Bundles from "./Bundles";
function App() {
  const [admin, setAdmin] = useState(false);
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
        <AppRoutes />
      </Container>
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/inventory" element={<Home />}></Route>
        {
          <Route path="/bundles" element={<Bundles />}></Route>
          //<Route path="/orders" element={<Orders />}></Route>
          //<Route path="/subscribe" element={<Subscribe />}></Route>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
