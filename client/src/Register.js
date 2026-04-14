import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
    const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/testAPI/user", {
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
        setMessage("User added successfully");
        setName("");
        setAge("");
        setPassword("");
        
        navigate("/login");
      } else {
        setMessage(data.error || "Error while adding user");
      }
    } catch (error) {
      setMessage("Error while adding user");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={handleAddUser}>
        <label>username :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <label>age :</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <br />

        <label>password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input type="submit" value="Add user" />
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;