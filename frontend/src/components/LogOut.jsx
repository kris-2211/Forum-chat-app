import React from "react";
import { Button } from "@mui/material"; // Import MUI Button
import { useNavigate } from "react-router-dom"; // For navigation after logout
import { logoutUser } from "../services/UserService"; // Import the logout service

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout function to remove token and user data
      await logoutUser();
      
      // Optionally, redirect the user to the login page or home page after logout
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <Button
      variant="contained" // MUI button variant (can be "outlined", "text", etc.)
      color="secondary" // MUI color (can be "primary", "success", etc.)
      onClick={handleLogout} // Logout on button click
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
