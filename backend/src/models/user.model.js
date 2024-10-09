import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    forums:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Forum"
    }],
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chats"
    }],
    otp:{
        type:String,
        required:false
    },
    otpExpires:{
        type:Date,
        required:false
    },
    isVerified:{
        type:Boolean,
        required:false
    }
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateToken=function(){
    return jwt.sign({
        email:this.email,
        username:this.username,
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    });
}

userSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.password;  // Remove password
      return ret;
    }
  });
  
const User = mongoose.model("User", userSchema);
export default User;