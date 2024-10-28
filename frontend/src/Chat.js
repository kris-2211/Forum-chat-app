import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ChatBox from './Chatcomponents/ChatBox';
import MyChats from './Chatcomponents/MyChats';
import SideDrawer from './Chatcomponents/SideDrawer';
import { ChatState } from './Context/ChatProvider'

function Chat() {
    const { user } = ChatState();
    const [fetchAgain,setFetchAgain] = useState(false)
    const history = useHistory()
    return (
        <div style={{ width: "100%" }}>
            {user&& <SideDrawer/>}
            <Box display={'flex'} alignItems={"center"} justifyContent={"space-around"} height="100%" width="100%">
                {user&&<MyChats fetchAgain={fetchAgain}/>}
                {user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    )
}

export default Chat
