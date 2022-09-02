const express=require("express")
const router=express.Router()
const{registeradmin,loginadmin}=require("../controllers/adminController")
const{reorderMedicine,deletereorderById, updateMedicine}= require("../controllers/sampleController")



router.post("/",registeradmin)

router.post("/login",loginadmin)
router.post("/reordermedicine", reorderMedicine)

router.delete('/deletereorderMedicine/:id', deletereorderById);





module.exports=router; 