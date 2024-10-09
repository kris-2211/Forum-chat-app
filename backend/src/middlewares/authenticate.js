import express from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authenticate =(req,res,next)=>{
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ");
    if(!token){
        return res.json(new ApiError(401,"unauthorized access"));
    }
    jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)
            res.json(new ApiError(403, "Forbidden"));
        req.user=user;
    });
    next();
}