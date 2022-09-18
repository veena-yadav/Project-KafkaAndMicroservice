const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {

    itemName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Item', itemSchema)