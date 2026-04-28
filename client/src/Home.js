import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#2b2b2b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 6,
          textAlign: "center",
          background: "linear-gradient(145deg, #2b2b2b, #2b2b2b)",
          border: "3px solid #fff",
          borderRadius: 0,
          boxShadow: "10px 10px 0px #000"
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: "18px", md: "28px" },
            color: "#ffcc00",
            mb: 3
          }}
        >
          PIXEL ARENA
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#00ff66",
            mb: 4,
            lineHeight: 2
          }}
        >
          WELCOME PLAYER
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            maxWidth: 700,
            mx: "auto",
            mb: 5,
            lineHeight: 1.8
          }}
        >
          Enter a retro arcade universe where every player can register, log in,
          and get ready to explore a game-inspired platform. This site is built
          with an old-school gaming vibe, pixel energy, and a classic console
          atmosphere.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 6
          }}
        >
          <Box
            sx={{
              border: "2px solid #fff",
              p: 3,
              backgroundColor: "#000",
              boxShadow: "4px 4px 0px #000"
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                color: "#ffcc00",
                mb: 2
              }}
            >
              CREATE PROFILE
            </Typography>

            <Typography sx={{ color: "#fff", fontSize: "14px", lineHeight: 1.7 }}>
              Register your player account and start your adventure in the arcade world.
            </Typography>
          </Box>

          <Box
            sx={{
              border: "2px solid #fff",
              p: 3,
              backgroundColor: "#000",
              boxShadow: "4px 4px 0px #000"
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                color: "#ffcc00",
                mb: 2
              }}
            >
              ACCESS GAME HUB
            </Typography>

            <Typography sx={{ color: "#fff", fontSize: "14px", lineHeight: 1.7 }}>
              Log in to access your personal space and continue your progression.
            </Typography>
          </Box>

          <Box
            sx={{
              border: "2px solid #fff",
              p: 3,
              backgroundColor: "#000",
              boxShadow: "4px 4px 0px #000"
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                color: "#ffcc00",
                mb: 2
              }}
            >
              RETRO EXPERIENCE
            </Typography>

            <Typography sx={{ color: "#fff", fontSize: "14px", lineHeight: 1.7 }}>
              Enjoy a pixel-style interface inspired by arcade machines and classic 8-bit games.
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#fff",
            mb: 4
          }}
        >
          CHOOSE YOUR ACTION
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap"
          }}
        >
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                border: "3px solid #fff",
                borderRadius: 0,
                boxShadow: "4px 4px 0px #000",
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                backgroundColor: "#00ff66",
                color: "#000",
                px: 3,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#00cc55",
                  boxShadow: "2px 2px 0px #000",
                  transform: "translate(2px,2px)"
                }
              }}
            >
              REGISTER
            </Button>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                border: "3px solid #fff",
                borderRadius: 0,
                boxShadow: "4px 4px 0px #000",
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                backgroundColor: "#ffcc00",
                color: "#000",
                px: 3,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#e6b800",
                  boxShadow: "2px 2px 0px #000",
                  transform: "translate(2px,2px)"
                }
              }}
            >
              LOGIN
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;