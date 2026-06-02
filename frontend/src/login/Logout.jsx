// src/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's login session
    localStorage.removeItem("user");

    // Navigate back to the login page
    navigate("/");
  };

  return (
    <button
      className="btn btn-danger"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
