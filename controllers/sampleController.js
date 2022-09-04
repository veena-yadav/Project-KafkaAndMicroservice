const asyncHandler = require('express-async-handler')
const Item = require('../models/itemmodel')
const addMed = require("../models/adminmedicine")
const Medicine = require("../models/reorderModel");
const controller = {
    //GET ALL ITEMS
    getSample: asyncHandler(async (req, res) => {
        const items = await Item.find()

        res.status(200).json(items)
    }),

    //ADDING ITEM
    addSample: asyncHandler(async (req, res) => {
        const item = await Item.create({
            itemName: req.body.itemName,
            price: req.body.price
        })

        res.status(200).json(item)
    }),

    // add reorder med
    reorderMedicine: asyncHandler(async (req, res) => {
        const addMedicine = await addMed.create({
            itemName: req.body.itemName,
            price: req.body.price,
            quantity: req.body.quantity
        })
        res.status(200).json(addMedicine)
    }),

    //cancel reordering
    deletereorderById: asyncHandler(async (request, response) => {
        const ID = request.params.id;
        await addMed.findByIdAndDelete(ID)
            .then(() => {
                response.json("Medicine Deleted from Database that has been reordered");
            })
            .catch(err => response.status(400).json("Error: " + err));
    }),

}
module.exports = controller;