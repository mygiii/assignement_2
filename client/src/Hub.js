import React from "react";

function Hub() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Hub</h1>

      {user ? (
        <h2>Welcome {user.name}</h2>
      ) : (
        <h2>No user connected</h2>
      )}
    </div>
  );
}

export default Hub;