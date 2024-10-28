const express = require("express");
const app = express();
const socket = require("socket.io");
const cors= require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes")
dotenv.config()
app.use(cors({origin:'*'}));

const server= app.listen(process.env.PORT,()=>{
    console.log("listening to port 4000");
});
connectDB()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Application is Live')
})
app.use('/api/user',userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message',messageRoutes)
const io = socket(server, {
    pingTimeout:60000,
    cors: {
        origin: "*",
    }
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");
  // console.log(socket.id)
  
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id,'hello')
    socket.emit('connected')
  })
  socket.on('joinchat', (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`)
  })
  socket.on('newMessage', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log('chat.users not defined')
    }

    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received',newMessageReceived)
    });
  })
  socket.on('typing', (room) => {
    console.log('typing')
    socket.in(room).emit('typing');
  })
  socket.on('stopTyping', (room) => {
    console.log('stop typing')
    socket.in(room).emit('stopTyping')
  })
  socket.off('setup', () => {
    socket.leave(userData._id)
  })
  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log("User Joined Room: " + data);
  // });

  // socket.on("send_message", (data) => {
  //   console.log(data);
  //   socket.to(data.room).emit("receive_message", data.content);
  // });

  // socket.on("disconnect", () => {
  //   console.log("USER DISCONNECTED");
  // });
});