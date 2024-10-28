import './App.css';
import react,{useEffect, useState } from 'react';
import io from "socket.io-client";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Reset from './Reset'
import Forgot from './Forgot'
import Chat from './Chat';
import { useHistory } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';
import HomePage from './HomePage';
import { Typography } from '@mui/material';
import CustomizedDialogs from './Chatcomponents/Profile';
let socket;
const CONNECTION_PORT = "https://socketchatgopi.herokuapp.com/";

function App() {
  const history = useHistory()
  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
      setMobile(true)
      
}else{
  // false for not mobile device
  setMobile(false)
  const user = JSON.parse(window.localStorage.getItem('userinfo'))
    if (user) {
      // history.push('/chats')
    }
}  
  }, [])
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [isMobile, setMobile] = useState(false);
  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // useEffect(() => {
  //   socket = io(CONNECTION_PORT);
  // }, [CONNECTION_PORT]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageList([...messageList, data]);
  //   });
  // });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };


  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div>
      
      <Router>
        <ChatProvider>
        <Route path='/' component={HomePage} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/register' component={Register} exact/>
        <Route path='/reset' component={Reset} exact/>
        <Route path='/forgot' component={Forgot} exact/>
        <Route path='/chats' component={Chat} exact/>
        <Route path='/test' component={CustomizedDialogs} exact/>
        </ChatProvider> 
      </Router>
    </div>
  );
}

export default App;
