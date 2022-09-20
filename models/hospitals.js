const mongoose = require('mongoose')

const hospitalsSchema = mongoose.Schema({
    hospitalName:{
        type:String,
        required:true
    },
    hospitalPhone:{
        type:String,
        required:true
    },
    hospitalEmail:{
        type:String,
        required:true
    },
    hospitalAddress:{
        type:String,
        required:true
    },
    hospitalAdmin:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Critical Hospitals',hospitalsSchema)