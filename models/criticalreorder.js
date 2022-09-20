const mongoose = require('mongoose')

const reorderSchema = mongoose.Schema({
    medicineName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Critical Reorder',reorderSchema)