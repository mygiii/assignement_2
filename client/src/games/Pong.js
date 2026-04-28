import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const width = 600;
const height = 400;
const paddleWidth = 12;
const paddleHeight = 80;
const ballSize = 14;

function Pong() {
  const [playerY, setPlayerY] = useState(160);
  const [aiY, setAiY] = useState(160);
  const [ball, setBall] = useState({
    x: width / 2,
    y: height / 2,
    dx: 4,
    dy: 3
  });
  const [score, setScore] = useState({ player: 0, ai: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setPlayerY((y) => Math.max(0, y - 30));
      }

      if (e.key === "ArrowDown") {
        setPlayerY((y) => Math.min(height - paddleHeight, y + 30));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBall((prevBall) => {
        let newBall = {
          ...prevBall,
          x: prevBall.x + prevBall.dx,
          y: prevBall.y + prevBall.dy
        };

        if (newBall.y <= 0 || newBall.y >= height - ballSize) {
          newBall.dy *= -1;
        }

        const playerHit =
          newBall.x <= 30 + paddleWidth &&
          newBall.y + ballSize >= playerY &&
          newBall.y <= playerY + paddleHeight;

        const aiHit =
          newBall.x + ballSize >= width - 30 - paddleWidth &&
          newBall.y + ballSize >= aiY &&
          newBall.y <= aiY + paddleHeight;

        if (playerHit || aiHit) {
          newBall.dx *= -1;
        }

        if (newBall.x < 0) {
          setScore((s) => ({ ...s, ai: s.ai + 1 }));
          return {
            x: width / 2,
            y: height / 2,
            dx: 4,
            dy: 3
          };
        }

        if (newBall.x > width) {
          setScore((s) => ({ ...s, player: s.player + 1 }));
          return {
            x: width / 2,
            y: height / 2,
            dx: -4,
            dy: 3
          };
        }

        return newBall;
      });

      setAiY((y) => {
        const target = ball.y - paddleHeight / 2;
        if (target > y) return Math.min(height - paddleHeight, y + 4);
        if (target < y) return Math.max(0, y - 4);
        return y;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [playerY, aiY, ball.y]);

  const restartGame = () => {
    setPlayerY(160);
    setAiY(160);
    setBall({
      x: width / 2,
      y: height / 2,
      dx: 4,
      dy: 3
    });
    setScore({ player: 0, ai: 0 });
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
          maxWidth: 950,
          p: 5,
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
            mb: 2
          }}
        >
          PONG
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#00ff66",
            mb: 3
          }}
        >
          PLAYER {score.player} : {score.ai} CPU
        </Typography>

        <Box
          sx={{
            width,
            height,
            backgroundColor: "#000",
            border: "3px solid #fff",
            mx: "auto",
            mb: 4,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "2px",
              height: "100%",
              background:
                "repeating-linear-gradient(to bottom, #fff 0px, #fff 12px, transparent 12px, transparent 24px)"
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: 30,
              top: playerY,
              width: paddleWidth,
              height: paddleHeight,
              backgroundColor: "#00ff66"
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: 30,
              top: aiY,
              width: paddleWidth,
              height: paddleHeight,
              backgroundColor: "#ffcc00"
            }}
          />

          <Box
            sx={{
              position: "absolute",
              left: ball.x,
              top: ball.y,
              width: ballSize,
              height: ballSize,
              backgroundColor: "#fff"
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "9px",
            color: "#fff",
            mb: 3
          }}
        >
          USE ↑ AND ↓ TO MOVE
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            onClick={restartGame}
            sx={{
              border: "3px solid #fff",
              borderRadius: 0,
              boxShadow: "4px 4px 0px #000",
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "10px",
              backgroundColor: "#00ff66",
              color: "#000"
            }}
          >
            RESTART
          </Button>

          <Link to="/hub" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                border: "3px solid #fff",
                borderRadius: 0,
                boxShadow: "4px 4px 0px #000",
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "10px",
                backgroundColor: "#ffcc00",
                color: "#000"
              }}
            >
              BACK
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Pong;