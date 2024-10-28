import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import env from '../Settings'

const ChatContext = createContext(); 

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState()
    const [notification, setNotification] = useState([])
    let history = useHistory()
    useEffect(async () => {
        const userInfo = JSON.parse(localStorage.getItem('userinfo'))
        setUser(userInfo)
        if (!userInfo) {
            history?.push('/login')
            // const config = {
            //         headers: {
            //             Authorization:`Bearer ${userInfo.token}`
            //         }
            //     }
            //     const {data}= await axios.get(`${env.api}/api/chat`, config);
            //     console.log((data))
            //     setChats(data)
            // console.log(userInfo)}
        }
    }, [history])
    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification,setNotification }}>
            {children}
        </ChatContext.Provider>
    )
}
// const context = useContext(ChatContext)
export const ChatState = () => {
    return useContext(ChatContext)

}
export default ChatProvider;