const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    emailID: {
        type: String,
        unique: true
    },
    order_bucket:
        [
            {
                itemName: {
                    type: String
                },
                quantity: {
                    type: Number
                },
                price: {
                    type: Number
                }
            }
        ],
    reorder_bucket:
        [
            {
                itemName: {
                    type: String
                },
                quantity: {
                    type: Number
                },
                price: {
                    type: Number
                }
            }
        ]
},
    {
        timestamps: true
    })

module.exports = mongoose.model('user_arjuns', userSchema)