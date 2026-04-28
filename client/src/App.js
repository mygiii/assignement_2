import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Hub from "./Hub";
import Snake from "./games/Snake";
import Pong from "./games/Pong";
import Tetris from "./games/Tetris";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </Router>
  );
}

export default App;