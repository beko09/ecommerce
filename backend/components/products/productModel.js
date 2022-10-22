const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'الرجاء ادخال اسم المنتج'],
        trim: true,
        maxLength: [100, 'اسم المنتج يجب ان لا يتعدي 100 حرف'],
        index: true
    },
    price: {
        type: Number,
        required: [true, 'الرجاء ادخال سعر المنتج'],
        maxLength: [10, 'يجب ان لايتعدي سعر المنتج 10 خانة'],
        default: 0.0
    },
    newprice: {
        type: Number,
        maxLength: [10, 'يجب ان لايتعدي سعر المنتج 10 خانة'],
        default: 0
    },
    discount: {
        type: Number,
        maxLength: [10, 'يجب ان لايتعدي سعر المنتج 10 خانة'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'الرجاء ادخال الوصف']
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    images: [
        {
            path: {
                type: String,
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: String,
        required: [true, 'الرجاء ادخال البائع']
    },
    stock: {
        type: Number,
        required: [true, 'الرجاء ادخال كمية المنتج في المخزن'],
        maxLength: [10, 'يجب ان لا تتعدي كمية المنتج في المخزن 10 خانات'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true

            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


productSchema.index({ a: 1, '$**': 'text' });



const Product = mongoose.model('Product', productSchema);
module.exports = Product;