import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }],
});

const Forum = mongoose.model("Forum", forumSchema);

export {Forum};