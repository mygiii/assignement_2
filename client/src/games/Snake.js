import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const size = 20;
const gridSize = 20;

function Snake() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown") setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft") setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight") setDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        const hitWall =
          newHead.x < 0 ||
          newHead.x >= gridSize ||
          newHead.y < 0 ||
          newHead.y >= gridSize;

        const hitSelf = prevSnake.some(
          (part) => part.x === newHead.x && part.y === newHead.y
        );

        if (hitWall || hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
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
          maxWidth: 900,
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
          SNAKE
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#00ff66",
            mb: 3
          }}
        >
          SCORE : {snake.length - 1}
        </Typography>

        <Box
          sx={{
            width: gridSize * size,
            height: gridSize * size,
            backgroundColor: "#000",
            border: "3px solid #fff",
            mx: "auto",
            mb: 4,
            position: "relative"
          }}
        >
          {snake.map((part, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: size,
                height: size,
                left: part.x * size,
                top: part.y * size,
                backgroundColor: "#00ff66"
              }}
            />
          ))}

          <Box
            sx={{
              position: "absolute",
              width: size,
              height: size,
              left: food.x * size,
              top: food.y * size,
              backgroundColor: "#ffcc00"
            }}
          />

          {gameOver && (
            <Typography
              sx={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "14px",
                color: "#ff5555",
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              GAME OVER
            </Typography>
          )}
        </Box>

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

export default Snake;