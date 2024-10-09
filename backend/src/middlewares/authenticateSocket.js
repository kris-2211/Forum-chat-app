export const authenticateSocket =(socket,next)=>{
    const token=socket.handshake.query.token;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err){
                next(new ApiError)
            }
        });
    }
}