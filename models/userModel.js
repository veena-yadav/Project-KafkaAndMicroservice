const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    password:{
        type:String,
        required:[true,'Please enter password']
    }, 
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true
    },
   age:{
        type:Number,
        required:[true,'Please add a name']
    },
    gender:{
        type:String,
        required:[true,'Please select gender']
    },
  dob:{
        type:Date,
        required:[true,'Please add a date of birth']
    },
   bloodGroup:{
        type:String,
        required:[true,'Please add a bg']
    },
   address:{
        type:String,
        required:[true,'Please add a address']
    },
    healthCond:{
        type:String,
      
    },
    criticalMedicines: [{type:String}],
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
                },
                status: {
                    type: String,
                    default: "Not Paid"
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
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)