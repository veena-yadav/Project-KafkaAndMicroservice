const asyncHandler = require('express-async-handler')
const Item=require('../models/itemmodel')
const addMed = require("../models/adminmedicine")
const controller={
    //GET ALL ITEMS
    getSample:  asyncHandler(async (req, res) => {
        const items = await Item.find()
      
        res.status(200).json(items)
      }),
      //ADDING ITEM
      addSample:  asyncHandler(async (req, res) => {
        const item = await Item.create({
            itemName:req.body.itemName,
            price:req.body.price
          })
      
        res.status(200).json(item)
      }),

      // add reorder med
      reorderMedicine:  asyncHandler(async (req, res) => {
        const addMedicine = await addMed.create({
            itemName:req.body.itemName,
            price:req.body.price,
            quantity:req.body.quantity
          })
        res.status(200).json( addMedicine)
      })
}
module.exports=controller;