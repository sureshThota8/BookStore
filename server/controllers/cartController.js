const Cart = require("../models/Cart");

// Get Cart
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("book");

        res.json(cart);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add to Cart
exports.addToCart = async (req, res) => {

    try {

        const { bookId } = req.body;

        let cartItem = await Cart.findOne({
            user: req.user.id,
            book: bookId
        });

        if (cartItem) {

            cartItem.quantity += 1;

            await cartItem.save();

        } else {

            cartItem = await Cart.create({
                user: req.user.id,
                book: bookId,
                quantity: 1
            });

        }

        res.json(cartItem);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Increase Quantity
exports.increaseQty = async (req, res) => {

    const cart = await Cart.findById(req.params.id);

    cart.quantity++;

    await cart.save();

    res.json(cart);

};

// Decrease Quantity
exports.decreaseQty = async (req, res) => {

    const cart = await Cart.findById(req.params.id);

    if (cart.quantity > 1) {
        cart.quantity--;
        await cart.save();
    }

    res.json(cart);

};

// Remove Cart Item
exports.removeCart = async (req, res) => {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
        message: "Removed"
    });

};