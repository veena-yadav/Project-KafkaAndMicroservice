const asyncHandler = require("express-async-handler");
const Medicine = require("../models/reorderModel");
const addMed = require("../models/adminmedicine")
const Item = require("../models/model.productDb");
const user = require("../models/userModel")
const orderDb = require('../models/model.orderDb');


const controller = {

    //update status

    // trackorder:asyncHandler(async (req, res) => {
    //  res.json("orderd");
    // }),
    changestatus:asyncHandler(async (req, res) => {
    var ar=['pickup','Onprocess','On Delmnivery','Delivered']
        const a=req.params.email
        const items = await orderDb.find({"email":a});
        console.log(items[0].order_bucket[0].status);
        const filter={"email":a}
       


       ar.forEach(element => {
        res.send(   
            setInterval(() => {
            const update1 = {status:element };
            orderDb.findOneAndUpdate(filter,update1);
          
          
   console.log(element)
       
       
             }, 6000)
    )



})




}),










    //GET ALL MEDICINES
    getMedicine: asyncHandler(async (req, res) => {
        //   console.log(req.cookies.jwt)
        const items = await Item.find()
        items.sort((a, b) => {
            let item1 = a.itemName.toLowerCase();
            let item2 = b.itemName.toLowerCase();
            if (item1 > item2) return 1;
            return -1;
        })
        res.status(200).json(items);
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
        const i2 = await Item.find()
        if (!req.params.name || req.params.name === " ")
            res.status(200).json(i2);
        else res.status(200).json(items);
    }),


    //     filterbyorder: asyncHandler(async (request, response) => {
    //         var b=request.params.email;
    //         var a = request.params.name;

    //         const med= await user.find({"email":b});
    // //console.log(med[0].order_bucket)
    //       const items = await user.order_bucket.find({"itemName":a},{"email":b})
    //         console.log("items",med);
    //         const i2=med[0].order_bucket;


    //        // console.log("i2",typeof(i2.order_bucket))
    //         if(!request.params.name || request.params.name===" ")
    //         response.status(200).json(i2);
    //        else response.status(200).json(items);
    //     }),





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
                        // .catch(err => response.status(400).json("Error: " + err));
                    })
                // .catch(err => response.status(400).json("Error: " + err));
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

    updateMedicine: asyncHandler(async (request, response) => {
        //reorderMedicine();
        // console.log(request.body.quantity);
        // console.log(request.params.itemName)
        const filter = { itemName: request.params.itemName };

        const update = { quantity: request.body.quantity, minimumThresholdValue: request.body.minimumThresholdValue, price: request.body.price };


        const users = await user.find({ "reorder_bucket.itemName": request.params.itemName })
        var ar = [];
        ar.push(request.params.itemName)
        //  console.log(users.email)
        for (let it in users) {
            let mn = users[it].email
            ar.push(mn)
        }


        console.log(ar)

        const numberOfMedi = await addMed.find({ "itemName": request.params.itemName })
        console.log(numberOfMedi)
        if (numberOfMedi.length != 0) {
            //  console.log("updating...")
            //console.log(numberOfMedi[0].count1)
            const filter = { "itemName": request.params.itemName }
            const update1 = { count1: numberOfMedi[0].count1 + 1 };
            await addMed.findOneAndUpdate(filter, update1);


            //  if(numberOfMedi){
            //     addMed.updateOne({count:numberOfMedi.count+1})
        }
        else {
            //console.log("adding...")
            const addMedicine = await addMed.create({
                itemName: request.body.itemName,
                price: request.body.price,
                quantity: request.body.quantity,
                count1: 1
            })
        }

        //addMedicine()


        await Medicine.deleteOne({ itemName: request.params.itemName }),
            await Item.findOneAndUpdate(filter, update, { new: true })
                .then(() => response.json(ar))
                .catch((err) => response.status(400).json("not found: " + err));
    }),








    //delete from reorder_collection db and medicine db


    deleteMedicine: asyncHandler(async (request, response) => {

        await Medicine.deleteOne({ itemName: request.params.itemName }),
            Item.deleteOne({ itemName: request.params.itemName })
                .then(() => {

                    response.json("Medicine Deleted from Database that has been reordered");
                })
                .catch(err => response.status(400).json("Error: " + err));
    }



    )
}

module.exports = controller;