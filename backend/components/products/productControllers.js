const Product = require("../products/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const fs = require('fs')



// add new product

const addProduct = catchAsyncError(async (req, res, next) => {
    let images = req.files

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++)
    {
        imagesLinks.push({
            path: images[i].path,
            url: req.protocol + "://" + req.get('host') + "/" + images[i].path
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

//  get all products
const getProducts = catchAsyncError(async (req, res) => {

    const products = await Product.find().populate('category', 'name').sort({ $natural: -1 }).limit(12);

    res.status(200).json({
        success: true,
        products
    });


});


//  search products 
const search = catchAsyncError(async (req, res, next) => {
    const q = req.query.q;
    const products = await Product.find({
        $or: [
            { "name": new RegExp(q, "gi") }
        ]
    }).populate('category');

    if (!products)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };
    res.status(200).json({
        success: true,
        products
    });
});


//  get products by category
const getProductsCategory = catchAsyncError(async (req, res, next) => {

    const productPerPage = 8;
    const category = req.params.id ? {
        category: req.params.id
    } : {}
    const allProductsInCategory = await Product.find(category).populate('category');
    let productsCount = allProductsInCategory.length;

    const currentPage = Number(req.query.page) || 1;
    const skip = productPerPage * (currentPage - 1);
    const products = await Product.find(category).populate('category').sort({ $natural: -1 }).limit(productPerPage).skip(skip);
    if (!products)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };

    res.status(200).json({
        success: true,
        productsCount,
        productPerPage,
        products
    });
});


//  get all products admin
const getAdminProducts = catchAsyncError(async (req, res) => {
    const productPerPage = 8;
    const productsCount = await Product.countDocuments();
    const currentPage = Number(req.query.page) || 1;
    const skip = productPerPage * (currentPage - 1);
    const products = await Product.find().sort({ $natural: -1 }).limit(productPerPage).skip(skip);

    res.status(200).json({
        success: true,
        productsCount,
        productPerPage,
        products
    });


});


// get single product
const getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('user');
    if (!product)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };
    res.status(200).json({
        success: true,
        product
    });
});


// update  product
const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };
    let images = req.files

    if (req.files !== null && req.files.length !== 0)
    {

        // Deleting images associated with the product
        if (product.images)
        {
            for (let i = 0; i < product.images.length; i++)
            {
                fs.unlink(`${product.images[i].path}`, (err) => {
                    console.log(err)
                })
            }
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++)
        {
            imagesLinks.push({
                path: images[i].path,
                url: req.protocol + "://" + req.get('host') + "/" + images[i].path
            })
        }

        req.body.images = imagesLinks

    }
    let newprice = 0;
    if (req.body.discount > 0)
    {
        newprice = (req.body.price) - (req.body.discount);
    }
    else if (req.body.discount > 0 && req.body.discount >= req.body.price)
    {
        req.body.price = 0;
    }
    req.body.newprice = newprice;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    });
});


// delete product
const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++)
    {

        fs.unlink(`${product.images[i].path}`, (err) => {
            console.log(err)
        })
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "تم مسح المنتج "
    });
});


// create product reviews
const createProductReviews = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const reviews = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviews = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviews)
    {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString())
            {
                review.comment = comment;
                review.rating = rating;

            }
        })

    } else
    {
        product.reviews.push(reviews);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        product
    })

});



// get all product reviews
const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id).populate('user').sort({ $natural: -1 });

    if (!product)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };
    const reviews = product.reviews;

    res.status(200).json({
        success: true,
        reviews
    })
});


//  get all products without limit
const getAllProducts = catchAsyncError(async (_req, res) => {

    const products = await Product.find().populate('category', 'name').sort({ $natural: -1 });

    res.status(200).json({
        success: true,
        products
    });


});



// delete product reviews
const deleteProductReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product)
    {
        return next(new ErrorHandler('المنتج غير موجود '
            , 404));
    };

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});






module.exports = {
    getProducts,

    addProduct,
    getSingleProduct,
    updateProduct,
    createProductReviews,
    getProductReviews,
    deleteProductReview,
    getAdminProducts,
    deleteProduct,
    getProductsCategory,
    getAllProducts,
    search
};