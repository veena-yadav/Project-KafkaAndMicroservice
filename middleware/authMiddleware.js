const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Admin = require("..//models/adminModel")

//token : bearer token(every token starts with bearer)
const protect = asyncHandler(async (req, res, next) => {
    let token

    try {
        token = req.cookies.JWT;
        console.log(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.id)
        //GET USER FROM TOKEN

        req.admin = await Admin.findById(decoded.id).select('-password')
        next()
    }
    catch (error) {
        console.log(error)
        res.statusCode = 401;

        throw new Error("not authorized")
    }

    if (!token) {
        res.statusCode = 401;
        throw new Error("not authorized", "no token")
    }
})

module.exports = { protect }