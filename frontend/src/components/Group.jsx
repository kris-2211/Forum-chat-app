import React from "react";
import { Box, Typography } from "@mui/material";
import Groupsidebar from "./Groupsidebar";

const Group = () => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Groupsidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Chats
        </Typography>
      </Box>
    </Box>
  );
};

export default Group;
