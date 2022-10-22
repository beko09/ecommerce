const express = require("express");
const upload = require("../middleware/multer");
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    profile,
    updatePassword,
    updateProfile,
    allUsers,
    getUser,
    updateUser,
    deleteUser
} = require("./userControllers");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");


const router = express.Router();


router.post("/users/register", upload.single('avatar'), register);
router.post("/users/login", login);
router.post("/users/password/forgot", forgotPassword);
router.put("/users/password/reset/:token", resetPassword);
router.get("/users/logout", logout);

//admin access this router
router.get("/users/profile/me", isAuthenticateUser, profile);
router.put("/users/profile/me/update", upload.single('avatar'), isAuthenticateUser, updateProfile);
router.put("/users/password/update", isAuthenticateUser, updatePassword);
router.get("/users", isAuthenticateUser, authorizeRole('admin'), allUsers);
router.get("/users/:id", isAuthenticateUser, authorizeRole('admin'), getUser);
router.put("/users/update/:id", upload.single('avatar'), isAuthenticateUser, authorizeRole('admin'), updateUser);
router.delete("/users/delete/:id", isAuthenticateUser, authorizeRole('admin'), deleteUser);


module.exports = router;
