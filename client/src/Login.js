import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/testAPI/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      });

      const data = await response.json();

      if (response.ok && data.exists) {
        //   on stocke l'utilisateur
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
            id: data.id,
            name: data.name,
            age: data.age
            }));
            navigate("/hub");

        //  redirection vers home
        navigate("/Hub");
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage("Error during login");
    }
  };

  return (
    <div className ='container'>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>username :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <label>password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input type="submit" value="Login" />
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Login;