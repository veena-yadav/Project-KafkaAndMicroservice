const express=require("express")
const router=express.Router()
const{registeradmin,loginadmin}=require("../controllers/adminController")
const{reorderMedicine}= require("../controllers/sampleController")



router.post("/",registeradmin)

router.post("/login",loginadmin)
router.post("/reordermedicine", reorderMedicine)





module.exports=router; 