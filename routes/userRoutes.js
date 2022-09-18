const express = require("express")
const router = express.Router()

const { registerUser,forgetPass ,loginUser, getme,resetPass, getAddress,changeAddress} = require("../controllers/userController")

const { protect } = require("../middleware/authMiddleware")

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/getme", protect, getme)

router.get("/forgetpassword/:email",forgetPass)

router.post("/resetpassword",resetPass)

router.get("/getaddress/:email",getAddress)


router.patch("/changeaddress/:email/:address",changeAddress)

//router.post()
module.exports = router;