const asyncHandler = require("express-async-handler");
const Medicine = require("../models/reorderModel");
const addMed = require("../models/adminmedicine")
const Item = require("../models/model.productDb");

const controller = {
    //GET ALL MEDICINES
    getMedicine: asyncHandler(async (req, res) => {
        //   console.log(req.cookies.jwt)
        const items = await Item.find()

        res.status(200).json(items)

    }),

    getMedicinebyvalue: asyncHandler(async (req, res) => {

        //   const items = await Item.find({quantity:{$lt:minimumThresholdValue}})
        const items = await Item.find({ $expr: { $gt: ["$minimumThresholdValue", "$quantity"] } })
        res.status(200).json(items)

    }),

    filterByName: asyncHandler(async (req, res) => {
        //User.find({ username: regexp});
        var a = req.params.name
        const items = await Item.find({
            itemName: { $regex: "^" + a, $options: 'i' },
        });

        res.status(200).json(items);
    }),

    getById: asyncHandler(async (request, response) => {
        await Item.findById(request.params.id)
            .then(items => response.json(items))
            .catch(err => response.status(400).json('Error: ' + err));
    }),

    addMedicine: asyncHandler(async (request, response) => {
        const itemName = request.body.itemName;
        const price = request.body.price;
        let quantity = request.body.quantity;
        const minimumThresholdValue = request.body.minimumThresholdValue;
        let query = {
            itemName: { $regex: itemName }
        };
        Item.findOne(query, async (err, result) => {
            if (err) {
                response.json(('Error: ') + err);
            }
            else if (result == null) {
                const newItem = new Item({
                    itemName,
                    price,
                    quantity,
                    minimumThresholdValue
                });
                await newItem.save()
                    .then(() => response.json("Medicine Not found in Database. Creating New Entry! Medicine added in the Database"))
                    .catch(err => response.status(400).json('Error: ' + err));
            }
            else {
                quantity += result.quantity;
                await Item.findByIdAndUpdate(result.id, { $set: request.body })
                    .then(() => {
                        Item.findByIdAndUpdate(result.id, { $set: { quantity } })
                            .then(() => {
                                response.write("Medicine already availale! Updated the Database")
                                response.send();
                            })
                            .catch(err => response.status(400).json("Error: " + err));
                    })
                    .catch(err => response.status(400).json("Error: " + err));
            }
        });
    }),

    deleteById: asyncHandler(async (request, response) => {
        const ID = request.params.id;
        await Item.findByIdAndDelete(ID)
            .then(() => {
                response.json("Medicine Deleted from Database");
            })
            .catch(err => response.status(400).json("Error: " + err));
    }),

    updateById: asyncHandler(async (request, response) => {
        await Item.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(() => response.json("Updated Databse"))
            .catch(err => response.status(400).json("Error: " + err));
    }),
    // add reorder med  reorder-history(admin-reorder) and updating in medicine collection
     
  updateMedicine:asyncHandler(async (request, response) => {
    //reorderMedicine();
    console.log(request.body.quantity);
    console.log(request.params.itemName)
    const filter={itemName:request.params.itemName};
    const update={quantity:request.body.quantity,minimumThresholdValue:request.body.minimumThresholdValue,price:request.body.price};

    const addMedicine = await addMed.create({
      itemName:request.body.itemName,
      price:request.body.price,
      quantity:request.body.quantity,
      
    })
    //addMedicine()


    await Medicine.deleteOne({itemName:request.params.itemName}),
    await Item.findOneAndUpdate(filter,update,{new:true})
      .then(() => response.json("Updated Databse"))
      .catch((err) => response.status(400).json("not found: " + err));
  }),




  //delete from reorder_collection db and medicine db


deleteMedicine:asyncHandler(async (request, response) => {
  
  await Medicine.deleteOne({itemName:request.params.itemName}),
  Item.deleteOne({itemName:request.params.itemName})
      .then(() => {
     
          response.json("Medicine Deleted from Database that has been reordered");
      })
      .catch(err => response.status(400).json("Error: " + err));
}



)
}

module.exports = controller;