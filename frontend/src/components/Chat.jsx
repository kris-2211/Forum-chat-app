import React from "react";
import { Box, Typography } from "@mui/material";
import Chatsidebar from "./Chatsidebar";

const Chat = () => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Chatsidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chats
        </Typography>
      </Box>
    </Box>
  );
};

export default Chat;
