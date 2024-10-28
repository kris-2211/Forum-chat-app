import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'

function ScrollableChat({ messages }) {
    const {user} = ChatState()
    return (
        // <div>
        <ScrollableFeed className='messages'>
            {messages && messages.map((msg, index) => (
                <div style={{ display: "flex" }} key={msg._id}>
                    {
                        (isSameSender(messages, msg, index, user._id) || isLastMessage(messages, index, user._id) && (
                            <Tooltip
                                title={msg.sender.name}
                                label={msg.sender.name}
                                placement='bottom-start'
                                arrow
                            >
                                <Avatar
                                    mt='7px'
                                    mr={1}
                                    sx={{ width: 24, height: 24 }}
                                    cursor='pointer'
                                    name={msg.sender.name}
                                    src={msg.sender.pic}
                                />
                            </Tooltip>
                        ))
                    }
                    <div style={{
                        backgroundColor: `${msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "50vw",
                        marginLeft: `${msg.sender._id !== user._id ? "3" : "auto"}`,
                        overflow:'auto',
                        // overflowX:'scroll'

                    }}>
                        {msg.content}
                    </div>
                </div>
            ))}
        </ScrollableFeed> 
        // </div>
    )
}

export default ScrollableChat
