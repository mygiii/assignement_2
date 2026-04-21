import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome</h1>
      <p>Please choose an option</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/register">
          <Button variant ="contained">Register</Button>
        </Link>

        <Link to="/login">
          <Button variant = "contained">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;