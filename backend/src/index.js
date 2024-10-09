import {app} from './app.js';
import {createServer} from "http";
import mongoose from 'mongoose';
import {Server} from "socket.io";
import { Chat } from './models/chats.model.js';
import { Message } from './models/messages.model.js';
import { Forum } from './models/forums.model.js';


const server= createServer(app);
const io=new Server(server,{
    cors:{
        origin: "*",
        methods:["GET", "POST"],
    },
    connectionStateRecovery:true,
});

// io.use(authenticateSocket);


io.on("connection",(socket)=>{
    console.log(`Client Connected ${socket.id}`);
    
    socket.on("join-chat",async (roomId)=>{
        const existingChat=await Chat.findOne({_id:roomId}).select(" _id ");
        if(!existingChat)
            socket.emit("errorMessage","No chat exists with this id");
        socket.join(roomId);
    });

    socket.on("join-forum", async(forumId)=>{
        const existingForum=await Forum.findOne({_id:forumId}).select(" _id ");
        if(!existingForum)
            socket.emit("errorMessage","No forum exists with this id");
        socket.join(forumId);
    });

    socket.on("privateMessage",async(roomId, senderId, content)=>{
        const message= new Message({
            sender:mongoose.Types.ObjectId(senderId),
            content:content,
        });
        await message.save();
        await Chat.findOneAndUpdate({_id:roomId},{$push:{messages:message._id}});
        io.to(roomId).emit("recieveMessage",content);
    });
    
    socket.on("forumMessage",async(forumId,senderId,content)=>{
        const message= new Message({
            sender:mongoose.Types.ObjectId(senderId),
            content:content,
        });
        await message.save();
        await Forum.findOneAndUpdate({_id:forumId},{$push:{messages:message._id}});
        io.to(forumId).emit("revieveFormMessage", content );
    });

    socket.on("disconnect",()=>{
        console.log("Client disconnected");
    });
});



server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

