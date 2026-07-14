const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

getCart,
addToCart,
removeCart,
increaseQty,
decreaseQty

} = require("../controllers/cartController");

router.get("/", auth, getCart);

router.post("/", auth, addToCart);

router.put("/increase/:id", auth, increaseQty);

router.put("/decrease/:id", auth, decreaseQty);

router.delete("/:id", auth, removeCart);

module.exports = router;