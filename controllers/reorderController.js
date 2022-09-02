const asyncHandler = require("express-async-handler");

const Item = require("../models/model.productDb");
const Medicine = require("../models/reorderModel");

const controller = {
  
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
        Medicine.findOne(query, async (err, result) => {
          if (err) {
            response.json("Error: " + err);
          } else if (result == null) {
            const newMedicine = new Medicine({
              itemName,
              price,
              quantity,
              minimumThresholdValue,
            });
            await newMedicine
              .save()
              .then(() =>
                res.json(
                  "not found"
                )
              )
              .catch((err) => res.status(400).json("Error: " + err));
          }
        });
      }
    }

    res.status(200).json(items);
  }),
};
module.exports = controller;
