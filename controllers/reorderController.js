const asyncHandler = require("express-async-handler");

const Item = require("../models/model.productDb");
const Medicine = require("../models/reorderModel");

const controller = {
    getReorder: asyncHandler(async (req, res) => {
        const items = await Medicine.find();

        res.status(200).json(items);
    }),

    getMedicinebyvalue: asyncHandler(async (req, res) => {
        //   const items = await Item.find({quantity:{$lt:minimumThresholdValue}})
        const items = await Item.find({
            $expr: { $gt: ["$minimumThresholdValue", "$quantity"] },
        });
        console.log(items.length);

        if (items.length !== 0) {
            for (let i = 0; i < items.length; i++) {
                const itemName = items[i].itemName;
                const price = items[i].price;
                let quantity = items[i].quantity;
                const minimumThresholdValue = items[i].minimumThresholdValue;
                let query = {
                    itemName: { $regex: itemName },
                };
                //  console.log(query)
                Medicine.findOne(query, async (err, result) => {
                    if (err) {
                        response.json("Error: " + err);
                    }
                    else if (result == null) {
                        const admin = await Medicine.create({
                            itemName,
                            price,
                            quantity,
                            minimumThresholdValue,
                        })
                    }
                });
            }
        }

        res.status(200).json(items);
    }),
};
module.exports = controller;