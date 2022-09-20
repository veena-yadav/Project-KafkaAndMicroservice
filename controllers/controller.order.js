const axios = require('axios');
const expressAsyncHandler = require('express-async-handler');
const Item = require('../models/model.productDb');
const userDb = require('../models/userModel');
const orderDb = require('../models/model.orderDb');
const Medicine = require("../models/reorderModel");
const medicineDbController = require('../controllers/reorderController');

const controller = {

    PlaceOrder: expressAsyncHandler(async (req, res) => {

        const items = await Item.find({
            $expr: { $gt: ["$minimumThresholdValue", "$quantity"] },
        });

        req.body.orders.forEach(element => {
            let query = {
                "itemName": { $regex: element.itemName }
            };

            //finding medicine name in the medcicine database
            Item.findOne(query, expressAsyncHandler(async (err, medicine) => {

                if (err) {
                    res.json("Error: " + err);
                }
                else {
                    if (medicine.quantity == 0) {
                        await drivers.addToReorderBucket_UserDB(element, req.body.email);

                        const itemName = medicine.itemName;
                        const price = medicine.price;
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
                                await newMedicine.save();
                            }
                        });
                    }
                    else if (medicine.quantity <= medicine.minimumThresholdValue) {

                        if (element.quantity <= medicine.quantity) {
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                        }
                        else if (element.quantity > medicine.quantity) {
                            element.quantity -= medicine.quantity;
                            let required = element.quantity;
                            await drivers.addToReorderBucket_UserDB(element, req.body.email);
                            element.quantity = medicine.quantity;
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                        }

                        const itemName = medicine.itemName;
                        const price = medicine.price;
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
                                await newMedicine.save();
                            }
                        });
                    }
                    else {
                        if (element.quantity <= medicine.quantity) {
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                        }
                        else if (element.quantity > medicine.quantity) {
                            element.quantity -= medicine.quantity;
                            let required = element.quantity;
                            await drivers.addToReorderBucket_UserDB(element, req.body.email);
                            element.quantity = medicine.quantity;
                            await drivers.addToOrderBucket_UserDB(element, req.body.email);
                        }
                    }
                }
            }))
        });
        res.send(items);
    }),

}

const operationsOnOrders = {
    fetchOrdersByEmail: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            let wrappedArray = [];
            const ordersFound = result.order_bucket;
            let notPaidOrders = [];

            result.order_bucket.sort((a, b) => {
                let item1 = a.itemName.toLowerCase(), item2 = b.itemName.toLowerCase();
                if (item1 > item2) return 1;
                return -1;
            })
            let totalAmount = 0;
            for (let i = 0; i < ordersFound.length; i++) {
                if (ordersFound[i].status === "Not Paid") {
                    notPaidOrders.push(ordersFound[i]);
                    totalAmount += ordersFound[i].price * ordersFound[i].quantity;
                }
            }
            totalAmount = totalAmount.toFixed(2);
            wrappedArray.push(totalAmount);
            wrappedArray.push(notPaidOrders);
            // console.log("undefined testing")
            // console.log(wrappedArray[0])
            // console.log(wrappedArray[1])
            response.json(wrappedArray);
        }
        else response.json([0,[]]);
    }),

    fetchOrdersPaid: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        }
        const result = await userDb.findOne(queryUserDb);
        if (result && result.order_bucket.length > 0) {
            let wrappedArray = [];
            const ordersFound = result.order_bucket;
            let PaidOrders = [];

            result.order_bucket.sort((a, b) => {
                let item1 = a.itemName.toLowerCase(), item2 = b.itemName.toLowerCase();
                if (item1 > item2) return 1;
                return -1;
            })
            let totalAmount = 0;
            for (let i = 0; i < ordersFound.length; i++) {
                if (ordersFound[i].status !== "Not Paid") {
                    PaidOrders.push(ordersFound[i]);
                    totalAmount += ordersFound[i].price * ordersFound[i].quantity;
                }
            }
            totalAmount = totalAmount.toFixed(2);
            wrappedArray.push(totalAmount);
            wrappedArray.push(PaidOrders);
            response.json(wrappedArray);
        }
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
    }),

    deleteAnOrder: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.params.email }
        };
        await userDb.findOneAndUpdate(queryUserDb, { $pull: { "order_bucket": { "itemName": request.params.itemName } } })
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
            result.order_bucket.sort((a, b) => {
                let item1 = a.itemName.toLowerCase(), item2 = b.itemName.toLowerCase();
                if (item1 > item2) return 1;
                return -1;
            })
            response.json(result.reorder_bucket);
        }
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
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
        else response.json([]);
    }),

    deleteAnReorder: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.params.email }
        };
        await userDb.findOneAndUpdate(queryUserDb, { $pull: { "reorder_bucket": { "itemName": request.params.itemName } } })
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

            await userDb.updateOne(queryUserDb, { $set: { "reorder_bucket.$.quantity": order.quantity } }, { new: true })
                .then(() => {
                    console.log("Successfully updated in the reorder bucket");
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
            "email": { $regex: email }
            // "order_bucket.itemName": { $regex: order.itemName }
        };
        for (let iter = 0; iter < order.length; iter++) {
            order[i].status = "Not Paid";
        }
        await userDb.findOne(queryUserDb, async (err, result) => {
            if (err) {
                console.log("Error : ", err);
            }
            else if (result) {
                let flagFound = false;
                for (let i = 0; i < result.order_bucket.length; i++) {
                    if (result.order_bucket[i].itemName === order.itemName && result.order_bucket[i].status === "Not Paid") {
                        result.order_bucket[i].quantity = order.quantity;
                        await result.save();
                        flagFound = true;
                        console.log("updated the order as the order entry was already present");
                        break;
                    }
                }
                if (flagFound !== true) {
                    console.log(order);
                    result.order_bucket.push(order);
                    await result.save();
                    console.log("added new entry in order bucket as previous order was not found");
                }
            }
        }).clone();
    }),

    moveOrderBucket: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        };
        const entry = await userDb.findOne(queryUserDb);
        let ordersOrderDb = [];
        let ordersUserDb = entry.order_bucket;
        for (let i = 0; i < request.body.order_bucket.length; i++) {
            const manasi = request.body.order_bucket;
            for (let j = 0; j < ordersUserDb.length; j++) {
                if (ordersUserDb[j].itemName === manasi[i].itemName && ordersUserDb[j].status === "Not Paid") {
                    ordersOrderDb.push({ "address": manasi[i].address, "status": "Paid", "itemName": manasi[i].itemName, "quantity": manasi[i].quantity, "price": manasi[i].price })
                    ordersUserDb[j].status = "Paid";
                    await entry.save();
                    break;
                }
            }
        }
        const entryInOrderDb = await orderDb.findOne(queryUserDb).clone();
        if (entryInOrderDb) {
            await orderDb.findByIdAndUpdate(entryInOrderDb._id, { $push: { order_bucket: ordersOrderDb } }, { new: true })
                .then(async () => {
                    for (let i = 0; i < request.body.order_bucket.length; i++) {
                        await drivers.updateMedicineDB(request.body.order_bucket[i]);

                        //notification
                        const itemName = request.body.order_bucket[i].itemName;

                        const arjun = await Item.find({ itemName })
                        const price = arjun[0].price;
                        let quantity = arjun[0].quantity;
                        const minimumThresholdValue = arjun[0].minimumThresholdValue;

                        let query = {
                            itemName: { $regex: itemName },
                        };
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

                    const items = await Item.find({
                        $expr: { $gt: ["$minimumThresholdValue", "$quantity"] },
                    });
                    response.send(items);
                })
                .catch(err => response.json("Error : " + err));
        }
        else {
            const email = entry.email;
            await orderDb.create({
                email,
                order_bucket: ordersOrderDb
            });
            for (let i = 0; i < request.body.order_bucket.length; i++) {
                await drivers.updateMedicineDB(request.body.order_bucket[i]);
                const itemName = request.body.order_bucket[i].itemName;
                const arjun = await Item.find({ itemName })
                const price = arjun[0].price;
                let quantity = arjun[0].quantity;
                const minimumThresholdValue = arjun[0].minimumThresholdValue;

                let query = {
                    itemName: { $regex: itemName },
                };

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

            const items = await Item.find({
                $expr: { $gt: ["$minimumThresholdValue", "$quantity"] },
            });

            response.send(items);
        }
    }),

    updateMedicineDB: async (order) => {
        let queryMedicineDb = {
            itemName: { $regex: order.itemName }
        };
        await Item.findOne(queryMedicineDb, async (err, result) => {
            let quantity = result.quantity - order.quantity;
            quantity = (quantity < 0) ? 0 : quantity;
            Item.findByIdAndUpdate(result._id, { $set: { quantity } })
                .then(() => {
                    console.log("Sucessfully updated the medicine database");
                })
        }).clone();
    }
}


module.exports = { controller, operationsOnOrders, operationsOnReorders, drivers };