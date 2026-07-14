const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req,res)=>{

    try{

        const cart = await Cart.find({
            user:req.user.id
        }).populate("book");

        if(cart.length===0){
            return res.status(400).json({
                message:"Cart is empty"
            });
        }

        const items = cart.map(item=>({
            book:item.book._id,
            quantity:item.quantity,
            price:item.book.price
        }));

        const total = items.reduce(
            (sum,item)=>sum + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user:req.user.id,
            items,
            total
        });

        await Cart.deleteMany({
            user:req.user.id
        });

        res.status(201).json(order);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

exports.getOrders = async(req,res)=>{

    const orders = await Order.find({
        user:req.user.id
    }).populate("items.book");

    res.json(orders);

};