const express = require("express")
const router = express.Router()
const { } = require("../controllers/userController")

const { protect } = require("../middleware/authMiddleware")

const medicineDbController = require('../controllers/controller.productDbAdmin');
//change status
router.post("/status/:email",medicineDbController.changestatus)
//get all medicines
router.get("/view", medicineDbController.getMedicine)
//router.get("/filter", medicineDbController.filterByName)
//get document using unique ID from db
router.get('/getMedicine/:id', medicineDbController.getById);
router.get("/filter/:name?", medicineDbController.filterByName)
//router.get("/filterbyorder/:email/:name?", medicineDbController.filterbyorder)
//add document into the database
router.post('/addMedicine', medicineDbController.addMedicine);

//delete document using ID
router.delete('/deleteMedicine/:id', medicineDbController.deleteById);

//update the already present document using the document ID
router.patch('/updateMedicine/:id', medicineDbController.updateById);

//delete and update from medicine and reorder collection
router.delete('/delete/:itemName', medicineDbController.deleteMedicine);
router.patch('/update/:itemName',medicineDbController.updateMedicine)

module.exports = router;