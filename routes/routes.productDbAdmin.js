const express=require("express")
const router=express.Router()
const{}=require("../controllers/userController")

const {protect}=require("../middleware/authMiddleware")

const medicineDbController = require('../controllers/controller.productDbAdmin');

router.patch('/update/:itemName',medicineDbController.updateMedicine)

//get all medicines
router.get("/view",medicineDbController.getMedicine)

//get document using unique ID from db
router.get('/getMedicine/:id', medicineDbController.getById);

//add document into the database
router.post('/addMedicine', medicineDbController.addMedicine);

//delete document using ID
router.delete('/deleteMedicine/:id', medicineDbController.deleteById);

//update the already present document using the document ID
router.patch('/updateMedicine/:id', medicineDbController.updateById);

//delete from medicine and reorder collection
router.delete('/delete/:itemName', medicineDbController.deleteMedicine);





module.exports=router;