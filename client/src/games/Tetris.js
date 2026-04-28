import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const rows = 20;
const cols = 10;
const blockSize = 24;

const shapes = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ]
];

function createBoard() {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function randomPiece() {
  return {
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    x: 3,
    y: 0
  };
}

function rotate(shape) {
  return shape[0].map((_, i) => shape.map((row) => row[i]).reverse());
}

function Tetris() {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState(randomPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkCollision = (newPiece, currentBoard = board) => {
    return newPiece.shape.some((row, y) =>
      row.some((cell, x) => {
        if (!cell) return false;

        const newX = newPiece.x + x;
        const newY = newPiece.y + y;

        return (
          newX < 0 ||
          newX >= cols ||
          newY >= rows ||
          (newY >= 0 && currentBoard[newY][newX])
        );
      })
    );
  };

  const mergePiece = (currentBoard, currentPiece) => {
    const newBoard = currentBoard.map((row) => [...row]);

    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;

          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      });
    });

    return newBoard;
  };

  const clearLines = (currentBoard) => {
    const newBoard = currentBoard.filter((row) => row.some((cell) => !cell));
    const cleared = rows - newBoard.length;

    while (newBoard.length < rows) {
      newBoard.unshift(Array(cols).fill(0));
    }

    if (cleared > 0) {
      setScore((s) => s + cleared * 100);
    }

    return newBoard;
  };

  const moveDown = () => {
    if (gameOver) return;

    const newPiece = { ...piece, y: piece.y + 1 };

    if (!checkCollision(newPiece)) {
      setPiece(newPiece);
    } else {
      const mergedBoard = mergePiece(board, piece);
      const clearedBoard = clearLines(mergedBoard);
      const nextPiece = randomPiece();

      if (checkCollision(nextPiece, clearedBoard)) {
        setGameOver(true);
      } else {
        setBoard(clearedBoard);
        setPiece(nextPiece);
      }
    }
  };

  const movePiece = (dir) => {
    if (gameOver) return;

    const newPiece = { ...piece, x: piece.x + dir };

    if (!checkCollision(newPiece)) {
      setPiece(newPiece);
    }
  };

  const rotatePiece = () => {
    if (gameOver) return;

    const newPiece = {
      ...piece,
      shape: rotate(piece.shape)
    };

    if (!checkCollision(newPiece)) {
      setPiece(newPiece);
    }
  };

  const restartGame = () => {
    setBoard(createBoard());
    setPiece(randomPiece());
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveDown();
    }, 500);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowDown") moveDown();
      if (e.key === "ArrowUp") rotatePiece();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const displayBoard = board.map((row) => [...row]);

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;

        if (
          boardY >= 0 &&
          boardY < rows &&
          boardX >= 0 &&
          boardX < cols
        ) {
          displayBoard[boardY][boardX] = 2;
        }
      }
    });
  });

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
          TETRIS
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#00ff66",
            mb: 3
          }}
        >
          SCORE : {score}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${blockSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${blockSize}px)`,
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            backgroundColor: "#000",
            border: "3px solid #fff",
            width: cols * blockSize,
            height: rows * blockSize
          }}
        >
          {displayBoard.flatMap((row, y) =>
            row.map((cell, x) => (
              <Box
                key={`${y}-${x}`}
                sx={{
                  width: blockSize,
                  height: blockSize,
                  boxSizing: "border-box",
                  border: "1px solid #111",
                  backgroundColor:
                    cell === 2 ? "#ffcc00" : cell === 1 ? "#00ff66" : "#000"
                }}
              />
            ))
          )}
        </Box>

        {gameOver && (
          <Typography
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "14px",
              color: "#ff5555",
              mb: 3
            }}
          >
            GAME OVER
          </Typography>
        )}

        <Typography
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "9px",
            color: "#fff",
            mb: 3
          }}
        >
          ← → MOVE | ↑ ROTATE | ↓ DOWN
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

export default Tetris;