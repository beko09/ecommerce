const Product = require("../products/productModel");
const Order = require("../orders/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");


// add new order

const addOrder = catchAsyncError(async (req, res) => {
    const {
        orderItems,
        shopInfo,
        taxPrice,
        itemsPrice,
        shopPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shopInfo,
        taxPrice,
        itemsPrice,
        shopPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id,
    });

    res.status(201).json({
        success: true,
        order
    });
});


//  get single orders if user logged
const getOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler( 'الطلب غير موجود ', 404));
    }

    res.status(200).json({
        success: true,
        order
    })

})

// get  orders if user logged
const getOrders = catchAsyncError(async (req, res, next) => {
     const orderPerPage = 8;
   
    const currentPage = Number(req.query.page) || 1;
    const skip = orderPerPage * (currentPage - 1);
    const orders = await Order.find({ user: req.user.id }).sort({ $natural: -1 }).limit(orderPerPage).skip(skip);

    if (!orders) {
        return next(new ErrorHandler(
           'الطلب غير موجود '
           , 404));
    }

    res.status(200).json({
        success: true,
        ordersCount:orders.length,
        orderPerPage,
        orders
    })

})

// get  orders if user is admin
const allOrders = catchAsyncError(async (req, res, next) => {
    const ordersTotal = await Order.find();
    const orderPerPage = 8;
    const ordersCount = await Order.countDocuments();
    const currentPage = Number(req.query.page) || 1;
    const skip = orderPerPage * (currentPage - 1);
    const orders = await Order.find().sort({ $natural: -1 }).limit(orderPerPage).skip(skip);
    let totalAmount = 0;
    ordersTotal.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        ordersCount,
        totalAmount,
        orderPerPage,
        orders
    })

})


// update status order by admin
const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "تم التوصيل") {
        return next(new ErrorHandler(
         'لقد قمت بالفعل بتسليم هذا الطلب '
           , 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()
    await order.save();
    res.status(200).json({
        success: true,
        // order
    })

})

// update product stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}


//  delete single orders if user logged
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler( 'الطلب غير موجود '
        , 404));
    }

    await order.remove();
    res.status(200).json({
        success: true,
        message: "تم مسح الطلب"
    });

})


module.exports = {
    addOrder,
    getOrder,
    getOrders,
    allOrders,
    updateOrder,
    deleteOrder
}