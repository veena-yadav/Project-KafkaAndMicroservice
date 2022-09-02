const asyncHandler = require('express-async-handler')
const Item=require('../models/itemmodel')
const addMed = require("../models/adminmedicine")
const reorderMedicine = require("../models/reorderModel");
const  Medicine= require("../models/model.productDb");
const req = require('express/lib/request');
const { ConnectionStates } = require('mongoose');
const controller={
    //GET ALL ITEMS
    getSample:  asyncHandler(async (req, res) => {
        const items = await Item.find()
      
        res.status(200).json(items)
      }),
     
      addSample:  asyncHandler(async (req, res) => {
        const item = await Item.create({
            itemName:req.body.itemName,
            price:req.body.price
          })
      
        res.status(200).json(item)
      }),

      // add reorder med  reorder-history(admin-reorder) and updating in medicine collection
      reorderMedicine:  asyncHandler(async (req, res) => {
        const addMedicine = await addMed.create({
            itemName:req.body.itemName,
            price:req.body.price,
            quantity:req.body.quantity
          })
        res.status(200).json( addMedicine)
      }),

      updateMedicine:asyncHandler(async (request, response) => {
     
        console.log(request.body.quantity);
        console.log(request.params.itemName)
        const filter={itemName:request.params.itemName};
        const update={quantity:request.body.quantity};

        const addMedicine = await addMed.create({
          itemName:req.body.itemName,
          price:req.body.price,
          quantity:req.body.quantity,
          
        })


        await Medicine.findOneAndUpdate(filter,update,{new:true})
          .then(() => response.json("Updated Databse"))
          .catch((err) => response.status(400).json("not found: " + err));
      }),







      //cancel reordering
      deletereorderById:  asyncHandler(async (request, response) => {
        const ID = request.params.id;
        await addMed.findByIdAndDelete(ID)
            .then(() => {
                response.json("Medicine Deleted from Database that has been reordered");
            })
            .catch(err => response.status(400).json("Error: " + err));
    }),

}
module.exports=controller;