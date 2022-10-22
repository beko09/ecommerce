const express = require("express");
const {
    addOrder,
    getOrders,
    getOrder,
    allOrders,
    updateOrder,
    deleteOrder
} = require("./orderControllers");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/order/new", isAuthenticateUser, addOrder);
router.get("/order/me", isAuthenticateUser, getOrders);
router.get("/order/:id", isAuthenticateUser, getOrder);

//admin access this router
router.get("/order", isAuthenticateUser, authorizeRole('admin'), allOrders);
router.put("/order/update/:id", isAuthenticateUser, authorizeRole('admin'), updateOrder);
router.delete("/order/delete/:id", isAuthenticateUser, authorizeRole('admin'), deleteOrder);





module.exports = router;
