const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    minimumThresholdValue: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Medicine Collection', itemSchema)