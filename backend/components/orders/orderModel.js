const mongoose = require("mongoose");


orderSchema = new mongoose.Schema({
    shopInfo: {
        address: {
            type: String,
            required: [true, 'الرجاء ادخال العنوان']
        },
        city: {
            type: String,
            required: [true, 'الرجاء ادخال المدينة']
        },
        phoneNo: {
            type: String,
            required: [true, 'الرجاء ادخال الهاتف']
        },
        postalCode: {
            type: String,
            required: [true, 'الرجاء ادخال الرمز البريدي']
        },
        country: {
            type: String,
            required: [true, 'الرجاء ادخال المدينة']
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        name: {
            type: String,
            required: [true, 'الرجاء ادخال الاسم']
        },
        quantity: {
            type: String,
            required: [true, 'الرجاء ادخال التقييم']
        },
        image: {
            type: String,
            required: [true, 'الرجاء ادخال الصورة']
        },
        price: {
            type: Number,
            required: [true, 'الرجاء ادخال السعر']
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shopPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'معالجة'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;