const express = require("express");
const {
    addCategory,
    getSingleCategory,
    deleteCategory,
    allCategories
} = require("./categoryController");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/categories",  allCategories);
router.post("/admin/category/new", isAuthenticateUser, authorizeRole("admin"), addCategory);
router.get("/admin/category/:id", isAuthenticateUser, authorizeRole("admin"), getSingleCategory);
router.delete("/admin/category/:id", isAuthenticateUser, authorizeRole("admin"), deleteCategory);


module.exports = router;
