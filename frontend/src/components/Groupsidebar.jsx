import React from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

const Groupsidebar = () => {
  const chats = ["Group 1", "Group 2", "Group 3"];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: 300,
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Groups</Typography>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            id="search-bar"
            label="Search Groups"
            variant="outlined"
            fullWidth
          />
        </Box>
        <List sx={{ mt: 1, flexGrow: 1 }}>
          {chats.map((chat, index) => (
            <Box key={index}>
              <ListItem>
                <ListItemText primary={chat} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Content on the right side */}
      </Box>
    </Box>
  );
};

export default Groupsidebar;
