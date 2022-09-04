const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email, age, gender, dob, bloodGroup, address, healthCond } = req.body

    if (!name || !password || !email || !age || !gender || !dob || !bloodGroup || !address) {
        res.statusCode = 400
        throw new Error('Please add all fields')
    }

    //if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.statusCode = 400;
        throw new Error("user already exists")

    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //createe user
    const users = await User.create({
        name, password: hashedPassword, email, age, gender, dob, bloodGroup, address, healthCond

    })

    if (users)
        res.status(201).json({
            name: users.name,
            _id: users.id,
            email: users.email,
            token: generateToken(users.id)
        })
    else {
        res.status(400)
        throw new Error('inalid user data')
    }

})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            name: user.name,
            _id: user.id,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error('inalid credential')
    }

})


const getme = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name, email
    })

})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
    registerUser, loginUser, getme
}