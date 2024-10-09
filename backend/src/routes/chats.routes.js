import {Router} from "express";
import { createChat,getChatOfUser,searchUser } from "../controllers/chats.controller.js";


const chatRouter =Router();

chatRouter
    .route('/create-chat')
    .post(createChat);
    
chatRouter  
    .route('/search')
    .get(searchUser);

chatRouter
    .route('/:id')
    .get(getChatOfUser);


export default chatRouter;