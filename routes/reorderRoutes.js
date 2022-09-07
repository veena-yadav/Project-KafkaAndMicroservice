const express = require("express")
const router = express.Router()
const { } = require("../controllers/userController")

const { protect } = require("../middleware/authMiddleware")
const medicineDbController = require('../controllers/reorderController');
router.get("/view",medicineDbController.getReorder)

router.get("/", medicineDbController.getMedicinebyvalue)//below threshold

module.exports = router;