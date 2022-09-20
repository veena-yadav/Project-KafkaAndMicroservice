const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const Admin = require("../models/adminModel")

const Medicine = require("../models/medicineModel")

const registeradmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!password || !email) {
        res.statusCode = 400
        throw new Error('Please add all fields')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //createe admin
    const admin = await Admin.create({
        email, password: hashedPassword
    })

    if (admin)
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id)
        })
    else {
        res.status(400)
        throw new Error('inalid admin data')
    }
})

const loginadmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const admins = await Admin.findOne({ email })

    if (admins && (await bcrypt.compare(password, admins.password))) {
        //sessionStorage.setItem("JWT",generateToken(admins.id))
        // console.log(res.sendsessionStorage.getItem('JWToken'))  

        res.cookie("JWT", generateToken(admins.id),
            {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
        console.log("mycooki " + req.cookies.JWT)
        res.json({
            name: admins.name,
            _id: admins.id,
            email: admins.email,
            token: generateToken(admins.id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid credential')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
    registeradmin, loginadmin
} 