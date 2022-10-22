const Category = require("./categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../products/productModel");



// add new Category
const addCategory = catchAsyncError(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json({
        success: true,
        category
    });
});



// get single category
const getSingleCategory = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category)
    {
        return next(new ErrorHandler(
            'القسم غير موجودة'
            , 404));
    };
    res.status(200).json({
        success: true,
        category
    });
});


// delete category
const deleteCategory = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category)
    {
        return next(new ErrorHandler('القسم غير موجودة'
            , 404));
    };
    await Product.remove({ category: req.params.id });
    await category.remove();
    res.status(200).json({
        success: true,
        message: "تم مسح القسم"
    });
});



// get all categories
const allCategories = catchAsyncError(async (req, res, next) => {
    const categoryCount = await Category.countDocuments();
    const categories = await Category.find().sort({ $natural: -1 });
    res.status(200).json({
        success: true,
        categoryCount,
        categories
    })
})



module.exports = {
    addCategory,
    getSingleCategory,
    deleteCategory,
    allCategories
};