const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

dashboard,
getUsers,
deleteUser,
changeRole,

getOrders,
updateOrder,
deleteOrder

} = require("../controllers/adminController");

router.get("/dashboard", auth, admin, dashboard);

router.get("/users", auth, admin, getUsers);

router.delete("/users/:id", auth, admin, deleteUser);

router.put("/users/:id", auth, admin, changeRole);
router.get(
"/orders",
auth,
admin,
getOrders
);

router.put(
"/orders/:id",
auth,
admin,
updateOrder
);

router.delete(
"/orders/:id",
auth,
admin,
deleteOrder
);
module.exports = router;