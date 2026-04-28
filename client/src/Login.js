import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const retroTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff66"
    },
    secondary: {
      main: "#ffcc00"
    },
    background: {
      default: "#2b2b2b",
      paper: "#2b2b2b"
    },
    text: {
      primary: "#ffffff"
    }
  },
  typography: {
    fontFamily: '"Press Start 2P", monospace'
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "4px solid #ffffff",
          borderRadius: 0,
          boxShadow: "8px 8px 0px #000000"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "3px solid #ffffff",
          borderRadius: 0,
          boxShadow: "4px 4px 0px #000000",
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "10px",
          padding: "12px 20px",
          "&:hover": {
            backgroundColor: "#00cc55",
            boxShadow: "2px 2px 0px #000000",
            transform: "translate(2px, 2px)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            backgroundColor: "#111111",
            color: "#00ff66",
            fontFamily: '"Press Start 2P", monospace',
            "& fieldset": {
              border: "3px solid #ffffff"
            },
            "&:hover fieldset": {
              border: "3px solid #ffcc00"
            },
            "&.Mui-focused fieldset": {
              border: "3px solid #00ff66"
            }
          },
          "& .MuiInputLabel-root": {
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "10px",
            color: "#ffffff"
          }
        }
      }
    }
  }
});

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/testAPI/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      });

      const data = await response.json();

      if (response.ok && data.exists) {
        localStorage.removeItem("user");
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            name: data.name,
            age: data.age
          })
        );

        navigate("/hub");
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage("Error during login");
    }
  };

  return (
    <ThemeProvider theme={retroTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2
        }}
      >
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            textAlign: "center"
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontSize: { xs: "20px", sm: "24px" },
              color: "secondary.main"
            }}
          >
            LOGIN
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center"
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 320, textAlign: "left" }}>
              <Typography sx={{ mb: 1, fontSize: "10px" }}>USERNAME</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box sx={{ width: "100%", maxWidth: 320, textAlign: "left" }}>
              <Typography sx={{ mb: 1, fontSize: "10px" }}>PASSWORD</Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary">
              START
            </Button>

            {message && (
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "10px",
                  color: "#ff5555"
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Login;