import { Button, IconButton, Modal, TextField, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserBadgeItem from './UserBadgeItem'
import UserList from './UserList'
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../Context/ChatProvider'
import axios from 'axios'
import env from '../Settings'
function GroupUpdate({ chat, open, setOpen, handleClose, fetchAgain, setFetchAgain}) {
    const { selectedChat,setSelectedChat, user, chats, setChats } = ChatState()
    const matches = useMediaQuery('(min-width:600px)');
    const [selectedUsers, setSelectedUsers] = useState([])
    const [groupChatName, setGroupChatName] = useState()
    const [searchResult, setSearchResult] = useState()
    const [loading, setLoading] = useState(false)
    const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
    console.log(selectedUsers)
        return;
    }
    setSelectedUsers([...selectedUsers, user])
    console.log(selectedUsers)
    }
    useEffect(() => {
        setGroupChatName(chat.chatName)
        setSelectedUsers([...chat.users])
    }, [])
    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== user._id))
    }
    const handleSearch = async (query) => {
    if (!query) {
        return;
    }
    try {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
        setLoading(true)
        const config = {
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${env.api}/api/user?search=${query}`, config)
        console.log(data)
        setSearchResult(data)
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedUsers.length <= 1) {
            console.log(selectedUsers.length)
            alert("Please Select atleast 2 users");
            return;
        }
        try {
        const userInfo = JSON.parse(localStorage.getItem('userinfo'))
           const config = {
                headers: {
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const { data } = axios.put(`${env.api}/api/chat/rename`, {
                chatId:selectedChat._id,
                chatName: groupChatName,
                // users:JSON.stringify(selectedUsers.map((user)=>user._id))
            }, config)
            // setChats([data, ...chats])
            setOpen(false)
            setFetchAgain(!fetchAgain)
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:!matches?300:400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                m:'auto'
            }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Update group
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        ><CloseIcon/></IconButton>
            </Typography>

            <Box id="modal-modal-description" sx={{ mt: 2, '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <TextField
                required
                id="outlined-name"
                label="Group Name"
                type="text"
                value={groupChatName}
                onChange={(e)=>{setGroupChatName(e.target.value)}}
            />
            {(selectedChat.groupAdmin._id===user._id)?<><TextField
                id="outlined-users"
                label="Add Users - Eg: Gopi, Arun"
                type="text"
                mt={2}
                onChange={(e)=>{handleSearch(e.target.value)}}
            />
            <Box width={"100%"} display={"flex"} flexWrap={"wrap"}>
            {selectedUsers? (selectedUsers.map(user => {return( <UserBadgeItem key={user._id} user={user} handleFunction={()=>handleDelete(user) }/>)})): <>Please Select</>  }
            {loading ? <div>Loading...</div> : (searchResult?.slice(0, 4).map(user => (<UserList key={user._id} user={user} handleFunction={()=>{handleGroup(user)}}/>)))}
            </Box></> : <></>}
            <Button variant='filled'
                disabled={!groupChatName || !selectedUsers.length}
                sx={{ backgroundColor: "blueviolet", color: 'white', mx: "30%", "&:hover": { backgroundColor: "green" } }}
                onClick={e => handleSubmit(e)}
                >
                Update
            </Button>
            </Box>
            </Box>
        </Modal>
    )
}

export default GroupUpdate
