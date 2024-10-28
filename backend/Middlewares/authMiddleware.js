const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            console.log(decoded.id)
            next()
        } catch (error) {
            res.status(400);
            console.log(error)
            throw new Error ("Not Authorized, invalid token")
        }
    }
    if (!token) {
        res.status(400)
        throw new Error ('Not authorized, no token')
    }
})

module.exports = { protect };