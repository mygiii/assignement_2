import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/testAPI/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("USER CREATED");
        navigate("/login");
      } else {
        setMessage(data.error || "ERROR");
      }
    } catch (error) {
      setMessage("ERROR");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#2b2b2b", // 🔥 fond noir comme login
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 600,
          textAlign: "center",

          // 🔥 EXACTEMENT comme login
          background: "linear-gradient(145deg, #2b2b2b, #1a1a1a)",
          border: "3px solid #ffffff",
          borderRadius: 0,
          boxShadow: "10px 10px 0px #000"
        }}
      >
        {/* TITLE */}
        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: "20px", sm: "24px" },
            color: "#ffcc00",
            mb: 4
          }}
        >
          REGISTER
        </Typography>

        <Box
          component="form"
          onSubmit={handleAddUser}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4
          }}
        >
          {/* USERNAME */}
          <Box sx={{ width: "100%", maxWidth: 350, textAlign: "left" }}>
            <Typography sx={{ fontSize: "10px", mb: 1, color: "#fff" }}>
              USERNAME
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  backgroundColor: "#000",
                  color: "#00ff66",
                  "& fieldset": {
                    border: "2px solid #fff"
                  }
                }
              }}
            />
          </Box>

          {/* AGE */}
          <Box sx={{ width: "100%", maxWidth: 350, textAlign: "left" }}>
            <Typography sx={{ fontSize: "10px", mb: 1, color: "#fff" }}>
              AGE
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  backgroundColor: "#000",
                  color: "#00ff66",
                  "& fieldset": {
                    border: "2px solid #fff"
                  }
                }
              }}
            />
          </Box>

          {/* PASSWORD */}
          <Box sx={{ width: "100%", maxWidth: 350, textAlign: "left" }}>
            <Typography sx={{ fontSize: "10px", mb: 1, color: "#fff" }}>
              PASSWORD
            </Typography>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  backgroundColor: "#000",
                  color: "#00ff66",
                  "& fieldset": {
                    border: "2px solid #fff"
                  }
                }
              }}
            />
          </Box>

          {/* BUTTON */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              border: "3px solid #fff",
              borderRadius: 0,
              boxShadow: "4px 4px 0px #000",
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "10px",
              backgroundColor: "#00ff66",
              color: "#000",
              "&:hover": {
                backgroundColor: "#00cc55",
                boxShadow: "2px 2px 0px #000",
                transform: "translate(2px,2px)"
              }
            }}
          >
            START
          </Button>

          {/* MESSAGE */}
          {message && (
            <Typography sx={{ color: "#ff5555", fontSize: "10px" }}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;