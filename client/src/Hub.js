import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";

function Hub() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1000,
          p: 6,
          textAlign: "center",
          background: "linear-gradient(145deg, #2b2b2b, #1a1a1a)",
          border: "3px solid #fff",
          borderRadius: 0,
          boxShadow: "10px 10px 0px #000"
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "24px",
            color: "#ffcc00",
            mb: 3
          }}
        >
          GAME HUB
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#00ff66",
            mb: 3
          }}
        >
          {user ? `WELCOME ${user.name.toUpperCase()}` : "NO PLAYER DETECTED"}
        </Typography>

        <Button
          onClick={handleLogout}
          sx={{
            border: "3px solid #fff",
            borderRadius: 0,
            boxShadow: "4px 4px 0px #000",
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            backgroundColor: "#ff5555",
            color: "#000",
            mb: 4,
            "&:hover": {
              backgroundColor: "#cc3333",
              boxShadow: "2px 2px 0px #000",
              transform: "translate(2px,2px)"
            }
          }}
        >
          LOGOUT
        </Button>

        <Typography sx={{ color: "#fff", fontSize: "14px", mb: 5 }}>
          Choose a game and start your adventure. More games coming soon...
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 5
          }}
        >
          <Paper sx={{ p: 3, backgroundColor: "#111", border: "2px solid #fff", boxShadow: "4px 4px 0px #000" }}>
            <Typography sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px", color: "#ffcc00", mb: 2 }}>
              SNAKE
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "12px", mb: 2 }}>
              Classic snake game. Eat, grow, survive.
            </Typography>
            <Link to="/snake" style={{ textDecoration: "none" }}>
              <Button sx={{ border: "2px solid #fff", borderRadius: 0, fontSize: "10px", backgroundColor: "#00ff66", color: "#000" }}>
                PLAY
              </Button>
            </Link>
          </Paper>

          <Paper sx={{ p: 3, backgroundColor: "#111", border: "2px solid #fff", boxShadow: "4px 4px 0px #000" }}>
            <Typography sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px", color: "#ffcc00", mb: 2 }}>
              PONG
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "12px", mb: 2 }}>
              Retro tennis game. Beat your opponent.
            </Typography>
            <Link to="/pong" style={{ textDecoration: "none" }}>
              <Button sx={{ border: "2px solid #fff", borderRadius: 0, fontSize: "10px", backgroundColor: "#00ff66", color: "#000" }}>
                PLAY
              </Button>
            </Link>
          </Paper>

          <Paper sx={{ p: 3, backgroundColor: "#111", border: "2px solid #fff", boxShadow: "4px 4px 0px #000" }}>
            <Typography sx={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px", color: "#ffcc00", mb: 2 }}>
              TETRIS
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "12px", mb: 2 }}>
              Stack blocks and clear lines.
            </Typography>
            <Link to="/tetris" style={{ textDecoration: "none" }}>
              <Button sx={{ border: "2px solid #fff", borderRadius: 0, fontSize: "10px", backgroundColor: "#00ff66", color: "#000" }}>
                PLAY
              </Button>
            </Link>
          </Paper>
        </Box>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#fff"
          }}
        >
          SELECT A GAME TO START
        </Typography>
      </Paper>
    </Box>
  );
}

export default Hub;