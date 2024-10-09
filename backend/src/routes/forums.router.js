import {Router} from "express";
import { createForum,getForumChats,searchForum } from "../controllers/forum.controller.js";

const forumRouter =Router();

forumRouter
    .route('/create-forum')
    .post(createForum);

forumRouter 
    .route('/search')
    .get(searchForum);

forumRouter
    .route('/:id')
    .get(getForumChats);

export default forumRouter;