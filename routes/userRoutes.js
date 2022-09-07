const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getme } = require("../controllers/userController")

const { protect } = require("../middleware/authMiddleware")

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/getme", protect, getme)


module.exports = router;