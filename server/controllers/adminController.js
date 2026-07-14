const User = require("../models/User");
const Order = require("../models/Order");
const Book = require("../models/Book");

// Dashboard
exports.dashboard = async (req, res) => {
    try {

        const books = await Book.countDocuments();
        const users = await User.countDocuments();
        const orders = await Order.countDocuments();

        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total"
                    }
                }
            }
        ]);

        res.json({
            books,
            users,
            orders,
            revenue: revenue[0]?.total || 0
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Get Users
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete User
exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Change Role
exports.changeRole = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        user.role =
            user.role === "admin"
                ? "user"
                : "admin";

        await user.save();

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
// Get All Orders

exports.getOrders = async (req,res)=>{

try{

const orders = await Order.find()

.populate("user","name email")

.populate("items.book","title price");

res.json(orders);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

// Update Order Status

exports.updateOrder = async(req,res)=>{

try{

const order = await Order.findById(req.params.id);

order.status = req.body.status;

await order.save();

res.json(order);

}catch(err){

res.status(500).json({
message:err.message
});

}

};

// Delete Order

exports.deleteOrder = async(req,res)=>{

try{

await Order.findByIdAndDelete(req.params.id);

res.json({
message:"Order Deleted"
});

}catch(err){

res.status(500).json({
message:err.message
});

}

};