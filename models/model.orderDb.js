const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    email:{
        type:String,
    },
    order_bucket:
    [
        {
            address:{
                type:String
            },
            itemName: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            status: {
                type: String
            }
        }
    ],
})
module.exports = mongoose.model('order arjuns', orderSchema);