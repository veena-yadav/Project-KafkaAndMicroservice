const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
  {

    itemName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    count1:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('reorder', adminSchema)