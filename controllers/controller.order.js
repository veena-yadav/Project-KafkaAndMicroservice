const axios = require('axios');
const { response } = require('express');
const expressAsyncHandler = require('express-async-handler');
const Item = require('../models/model.productDb');
const userDb = require('../models/userModel');
const Medicine = require("../models/reorderModel");
const medicineDbController = require('../controllers/reorderController');

const controller = {
    PlaceOrder: expressAsyncHandler(async (req, res) => {


        const items = await Item.find({
            $expr: { $gt: ["$minimumThresholdValue", "$quantity"] },
        });

        console.log(items)
        req.body.orders.forEach(element => {
            let query = {
                "itemName": { $regex: element.itemName }
            };

            //finding medicine name in the medcicine database
            Item.findOne(query, expressAsyncHandler(async (err, medicine) => {
                console.log(medicine)
        
                if (err) {
                    res.json("Error: " + err);
                }
                else {
                    if (medicine.quantity == 0) {
                        await drivers.addToReorderBucket_UserDB(element, req.body.email);
                      //  medicine.quantity += element.quantity;
                      //  medicineDbController.getMedicinebyvalue()
                      console.log(medicine) 
                     
                      const itemName =medicine.itemName;
                      const price =medicine.price;
                      let quantity = element.quantity;
                      const minimumThresholdValue = medicine.minimumThresholdValue;
                      let query = {
                          itemName: { $regex: itemName },
                      };
                      Medicine.findOne(query, async (err, result) => {
                          if (err) {
                              response.json("Error: " + err);
                          }
                          else if (result == null) {
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



                    }  else if(medicine.quantity<=medicine.minimumThresholdValue) {
                        
                        if (element.quantity <= medicine.quantity) {
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                          //  medicine.quantity -= element.quantity;
                            //await drivers.updateMedicineDB(medicine);
                        }
                        else if (element.quantity > medicine.quantity) {
                            element.quantity -= medicine.quantity;
                            let required = element.quantity;
                            await drivers.addToReorderBucket_UserDB(element, req.body.email);
                            element.quantity = medicine.quantity;
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                          //  medicine.quantity -= element.quantity;
                            ////await drivers.updateMedicineDB(medicine);
                        }


                        const itemName =medicine.itemName;
                        const price =medicine.price;
                        let quantity =element.quantity;
                        const minimumThresholdValue = medicine.minimumThresholdValue;
                        let query = {
                            itemName: { $regex: itemName },
                        };
                        Medicine.findOne(query, async (err, result) => {
                            if (err) {
                                response.json("Error: " + err);
                            }
                            else if (result == null) {
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
                                 //   .catch((err) => res.status(400).json("Error: " + err));
                            }
                        });





                    }
                    else {
                        if (element.quantity <= medicine.quantity) {
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                          //  medicine.quantity -= element.quantity;
                            //await drivers.updateMedicineDB(medicine);
                        }
                        else if (element.quantity > medicine.quantity) {
                            element.quantity -= medicine.quantity;
                            let required = element.quantity;
                            await drivers.addToReorderBucket_UserDB(element, req.body.email);
                            element.quantity = medicine.quantity;
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                          //  medicine.quantity -= element.quantity;
                            ////await drivers.updateMedicineDB(medicine);
                        }
                    }
                }
            }))
        });
        res.send(items)
       // res.end()
    }),

}

const operationsOnOrders = {
    fetchOrdersByEmail: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.itemName > b.itemName) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchOrdersByEmailSortByPriceAsc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.price > b.price) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchOrdersByEmailSortByPriceDesc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.price < b.price) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchOrdersByEmailSortByQuantityAsc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.quantity > b.quantity) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchOrdersByEmailSortByQuantityDesc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.quantity < b.quantity) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    deleteAnOrder: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        };
        await userDb.findOneAndUpdate(queryUserDb, { $pull: { "order_bucket": { "itemName": request.body.itemName } } })
            .then(() => response.json("deleted"))
            .catch(err => response.json("Error : " + err));
    })
}

const operationsOnReorders = {
    fetchReordersByEmail: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.reorder_bucket.length > 0) {
            result.reorder_bucket.sort((a, b) => {
                if (a.itemName > b.itemName) return 1;
                return -1;
            })
            response.json(result.reorder_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchReordersByEmailSortByPriceAsc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.price > b.price) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchReordersByEmailSortByPriceDesc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.price < b.price) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchReordersByEmailSortByQuantityAsc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.quantity > b.quantity) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    fetchReordersByEmailSortByQuantityDesc: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            result.order_bucket.sort((a, b) => {
                if (a.quantity < b.quantity) return 1;
                return -1;
            })
            response.json(result.order_bucket);
        }
        else response.json("You have no orders to view");
    }),

    deleteAnReorder: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        };
        await userDb.findOneAndUpdate(queryUserDb, { $pull: { "reorder_bucket": { "itemName": request.body.itemName } } })
            .then(() => response.json("deleted"))
            .catch(err => response.json("Error : " + err));
    })
}

const drivers = {
    addToReorderBucket_UserDB: expressAsyncHandler(async (order, email) => {
        let queryUserDb = {
            "email": { $regex: email },
            "reorder_bucket.itemName": { $regex: order.itemName }
        };
        const reorderExist = await userDb.findOne(queryUserDb);
        if (reorderExist) {

            await userDb.updateOne(queryUserDb, { $inc: { "reorder_bucket.$.quantity": order.quantity } }, { new: true })
                .then(() => {
                    console.log("Successfully updated in the reorder bucket and reorder exists");
                })
                .catch(err => { console.log("Error : " + err) })
        }
        else {
            let userExist = await userDb.findOne({ "email": { $regex: email } });
            await userDb.findByIdAndUpdate(userExist._id, { $push: { reorder_bucket: order } }, { new: true })
                .then(() => {
                    console.log("Successfully added in the reorder bucket");
                })
                .catch(err => { console.log("Error : " + err) })
        }
    }),

    addToOrderBucket_UserDB: expressAsyncHandler(async (order, email) => {
        let queryUserDb = {
            "email": { $regex: email },
            "order_bucket.itemName": { $regex: order.itemName }
        };
        const orderExist = await userDb.findOne(queryUserDb);
        if (orderExist) {

            await userDb.updateOne(queryUserDb, { $inc: { "order_bucket.$.quantity": order.quantity } }, { new: true })
                .then(() => {
                    console.log("Successfully updated in the order bucket and reorder exists");
                })
                .catch(err => { console.log("Error : " + err) })
        }
        else {
            let userExist = await userDb.findOne({ "email": { $regex: email } });
            await userDb.findByIdAndUpdate(userExist._id, { $push: { order_bucket: order } }, { new: true })
                .then(() => {
                    console.log("Successfully added in the reorder bucket");
                })
                .catch(err => { console.log("Error : " + err) })
        }
    }),

    updateMedicineDB: async (order) => {
        let queryMedicineDb = {
            itemName: { $regex: order.itemName }
        };
        Item.findOne(queryMedicineDb, async (err, result) => {
            let quantity = order.quantity;
            Item.findByIdAndUpdate(result.id, { $set: { quantity } })
                .then(() => {
                    console.log("Sucessfully updated the medicine database");
                })
        });
    }
}


module.exports = { controller, operationsOnOrders, operationsOnReorders };