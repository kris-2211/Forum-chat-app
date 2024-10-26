import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Chat} from "../models/chats.model.js"
import {User} from "../models/user.model.js"

// export const createChat=async (req,res)=>{
//     const {user,other} =req.body;
//     const self=await User.findOne({username:user});
//     const part2=await User.findOne({username:other});
//     const chat=Chat.create({
//         participants:[self._id,part2._id],
//     });
//     self.chats.push(chat._id);
//     part2.chats.push(chat._id);
//     return res.json(new ApiResponse(200,"Chat created successfully",chat));
// }
export const createChat = async (req, res) => {
    const { user, other } = req.body;

    try {
        // Find users by username
        const self = await User.findOne({ username: user });
        const part2 = await User.findOne({ username: other });

        // Check if users exist
        if (!self || !part2) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Create a new chat and await the result
        const chat = await Chat.create({
            participants: [self._id, part2._id],
        });

        // Push the chat ID into both users' chats arrays
        self.chats.push(chat._id);
        part2.chats.push(chat._id);
        
        // Save changes to both users
        await self.save();
        await part2.save();

        // Respond with success
        // return res.json(new ApiResponse(200, "Chat created successfully", chat));
        return res.json(new ApiResponse(200, "Chat created successfully", {
            chat,
            updatedChats: self.chats // Send updated chats
        }));
    } catch (error) {
        console.error("Error creating chat:", error);
        return res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};


export const getChatOfUser=async(req,res)=>{
    const id = req.params.id;
    const chat=await Chat.findById(id).populate("participants");
    if(!chat)
        return res.json(new ApiError(404,"Chat not found"));
    return res.json(new ApiResponse(200,"Found chat",chat));
}

export const searchUser=async (req,res)=>{
    const self=req.user.username;
    const {username}=req.query;
    // console.log(self);   //all users except self
    const users=(await User.find({username:{$regex:"^"+username, $options:'i',$ne:self}}).limit(10).select(" username -_id")).map(user=>user.username);
    if(users.length==0)
        return  res.json(new ApiError(404,"No user with this username found"));
    return res.json(new ApiResponse(200,"Found users",users));
}

