const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    items:[
        {
            book:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Book"
            },

            quantity:Number,

            price:Number
        }
    ],

    total:Number,

    status:{
        type:String,
        enum:[
            "Pending",
            "Processing",
            "Shipped",
            "Delivered"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Order", orderSchema);