const express = require("express")
const router = express.Router()
const { registeradmin, loginadmin } = require("../controllers/adminController")
const { reorderMedicine, deletereorderById,getReorderedmed } = require("../controllers/sampleController")


router.post("/", registeradmin)

router.post("/login", loginadmin)
router.post("/reordermedicine", reorderMedicine)
router.delete('/deletereorderMedicine/:id', deletereorderById);
router.get("/getreorderedmedicine",getReorderedmed)

module.exports = router; 