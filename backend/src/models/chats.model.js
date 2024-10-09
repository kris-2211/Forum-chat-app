import mongoose from "mongoose";

const chatSchema =new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:'Messages',
    }],
});

const Chat= mongoose.model("Chats",chatSchema);

export {Chat};