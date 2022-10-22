const express = require("express");
const { getProducts, addProduct,
    getSingleProduct, updateProduct,
    getAdminProducts, deleteProduct,
    createProductReviews, getProductReviews,
    deleteProductReview, getProductsCategory
    , getAllProducts, search } = require("./productControllers");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");


const upload = require("../middleware/multer");

const router = express.Router();


router.get("/products", getProducts);
router.get("/products/all", getAllProducts);
router.get("/products/category/:id", getProductsCategory);

router.get("/search", search);
router.get("/admin/products", isAuthenticateUser, authorizeRole("admin"), getAdminProducts);
router.get("/product/reviews", isAuthenticateUser, getProductReviews);
router.delete("/product/reviews/delete", isAuthenticateUser, deleteProductReview);
router.get("/product/:id", getSingleProduct);

//  admin
router.post("/admin/product/new", upload.array('productImages', 12), isAuthenticateUser, authorizeRole("admin"), addProduct);


router.put("/admin/product/:id", upload.array('productImages', 12), isAuthenticateUser, authorizeRole("admin"), updateProduct);
router.delete("/admin/product/:id", isAuthenticateUser, authorizeRole("admin"), deleteProduct);

router.put("/product/review/new", isAuthenticateUser, createProductReviews);

module.exports = router;
