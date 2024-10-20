import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Forum} from '../models/forums.model.js'
import {User} from '../models/user.model.js';

export const createForum=async (req,res)=>{
    const {title, createdBy}=req.body;
    const forum =await Forum.create({
        title,
        createdBy
    });
    await User.updateOne({_id:createdBy},{$push:{forums:forum._id}});
    return res.json(new ApiResponse(200,"Forum created successfully",forum));
}

export const getForumChats=(req,res)=>{
    const {forumId}=req.params;
    const forum=Forum.findById(forumId).populate("chats");
    if(!forum)
        return res.json(new ApiError(404,"Forum not found"));
    return res.json(new ApiResponse(200,"Found chats",forum.chats));
}

export const searchForum=async (req,res)=>{
    const {title}=req.query;
    const forums=await Forum.find({title:{$regex:title, $options:'i'}}).limit(10).select(" title -_id").map(forum=>forum.title);
    // console.log(users);
    if(forums.length==0)
        return res.json(new ApiError(404,"No forums with this name found"));
    return res.json(new ApiResponse(200,"Found forums",forums));
    
}
