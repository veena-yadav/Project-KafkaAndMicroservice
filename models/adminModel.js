const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Admin', adminSchema) 