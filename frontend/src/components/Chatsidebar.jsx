// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Typography,
// } from "@mui/material";
// import { searchUser, createChat } from "../services/ChatService"; // Ensure createChat is imported

// const Chatsidebar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [chats, setChats] = useState(["chat1","chat2","chat3"]); // This holds the list of chat usernames

  
//   const handleSearch = async (event) => {
//     const query = event.target.value;
//     setSearchTerm(query);
  
//     if (query) {
//       try {
//         const response = await searchUser(query);
//         console.log("Search response:", response);
  
//         if (response.success) {
//           console.log("Users found:", response.data);
//           setChats(response.data);
//         } else {
//           console.log("No users found");
//           setChats([]);
//         }
//       } catch (error) {
//         console.error("Error searching for users:", error.response ? error.response.data : error.message);
//       }
//     } else {
//       setChats([]);
//     }
//   };
  
//   const handleUserClick = async (otherUser) => {
//     const userInfo = JSON.parse(localStorage.getItem("user"));
//     const currentUser = userInfo ? userInfo.username : null;
  
//     if (!currentUser) {
//       alert("User not found in local storage.");
//       return;
//     }
  
//     try {
//       const response = await createChat(currentUser, otherUser);
      
//       if (response && response.data && Array.isArray(response.data.updatedChats)) {
//         // Store the updated chats in localStorage
//         localStorage.setItem("chats", JSON.stringify(response.data.updatedChats));
//       } 
//       console.log("Chat created response:", response);
//       alert(`Chat created successfully with ${otherUser}`);
//     } catch (error) {
//       console.error("Error creating chat:", error.response ? error.response.data : error.message);
//       alert("Failed to create chat");
//     }
//   };
  

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Box
//         sx={{
//           width: 300,
//           padding: 2,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography variant="h6">Chats</Typography>
//         <Divider />
//         <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//           <TextField
//             id="search-bar"
//             label="Search Chats"
//             variant="outlined"
//             fullWidth
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </Box>
//         <List sx={{ mt: 1, flexGrow: 1 }}>
//           {chats.length > 0 ? (
//             chats.map((chat, index) => (
//               <Box key={index}>
//                 <ListItem  onClick={() => handleUserClick(chat)}> {/* Add button behavior */}
//                   <ListItemText primary={chat} />
//                 </ListItem>
//                 <Divider />
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               No chats found
//             </Typography>
//           )}
//         </List>
        
//       </Box>
      
//       <Divider orientation="vertical" flexItem />
//       <Box sx={{ flexGrow: 1, padding: 2 }}>
//         {/* Content on the right side */}
//       </Box>
//     </Box>
//   );
// };

// export default Chatsidebar;

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { searchUser, createChat } from "../services/ChatService";

const Chatsidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [existingChats, setExistingChats] = useState([]);

  // Load existing chats from localStorage when component mounts
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setExistingChats(storedChats);
  }, []);

  // Update localStorage when existing chats change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(existingChats));
  }, [existingChats]);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query) {
      try {
        const response = await searchUser(query);
        console.log("Search response:", response);

        if (response.success) {
          console.log("Users found:", response.data);
          setSearchResults(response.data);
        } else {
          console.log("No users found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error(
          "Error searching for users:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleUserClick = async (otherUser) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const currentUser = userInfo ? userInfo.username : null;

    if (!currentUser) {
      alert("User not found in local storage.");
      return;
    }

    try {
      const response = await createChat(currentUser, otherUser);

      if (response && response.data && Array.isArray(response.data.updatedChats)) {
        const updatedChats = response.data.updatedChats;
        setExistingChats(updatedChats); // Update existing chats
      }

      console.log("Chat created response:", response);
      alert(`Chat created successfully with ${otherUser}`);
    } catch (error) {
      console.error(
        "Error creating chat:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create chat");
    }
  };

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
        <Typography variant="h6">Chats</Typography>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            id="search-bar"
            label="Search Users"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <Paper sx={{ maxHeight: 200, overflow: "auto", mt: 1 }}>
            <List>
              {searchResults.map((user, index) => (
                <ListItem key={index} onClick={() => handleUserClick(user)}>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>Existing Chats</Typography>
        <Divider />

        {/* Existing Chats List */}
        <List sx={{ mt: 1, flexGrow: 1 }}>
          {existingChats.length > 0 ? (
            existingChats.map((chat, index) => (
              <Box key={index}>
                <ListItem onClick={() => handleUserClick(chat)}>
                  <ListItemText primary={chat} />
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              No existing chats
            </Typography>
          )}
        </List>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Content on the right side */}
      </Box>
    </Box>
  );
};

export default Chatsidebar;

