import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/UserService"; // Make sure to have a service to fetch user data

// Styled components for customization
const ProfileBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
});

const ProfileDetails = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  textAlign: "center",
}));

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile(); // Adjust API call to get current user profile
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <ProfileBox>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <ProfileDetails elevation={3}>
        <Typography variant="h6">{user.fullname}</Typography>
        <Typography variant="body1" color="textSecondary">
          @{user.username}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">Email: {user.email}</Typography>
        <Typography variant="body2">Forums Joined: {user.forums?.length || 0}</Typography>
        <Typography variant="body2">Chats Participated: {user.chats?.length || 0}</Typography>
        <Typography variant="body2">
          Verified: {user.isVerified ? "Yes" : "No"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/edit-profile")} // Optional edit profile route
        >
          Edit Profile
        </Button>
      </ProfileDetails>
    </ProfileBox>
  );
};

export default Profile;
