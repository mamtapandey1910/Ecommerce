const express = require("express");
const { userRegistration, userLogin, userLogout, getMyProfileDetails, forgotPassword, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUserRole, deleteUser } = require("../controllers/userController");
const isauthenticated = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const Router = express.Router();

Router.post("/register", userRegistration);
Router.post("/login", userLogin);
Router.get("/me", isauthenticated, getMyProfileDetails);
Router.put("/update_password", isauthenticated, updatePassword);
Router.put("/update_profile", isauthenticated, updateProfile);
Router.post("/forgot_password", forgotPassword);
Router.get("/allusers", isauthenticated, authorizeAdmin("admin"), getAllUsers);
Router.get("/getuser_details/:id", isauthenticated, authorizeAdmin("admin"), getUserDetails);
Router.put("/update_user_role/:id", isauthenticated, authorizeAdmin("admin"), updateUserRole);
Router.delete("/delete_user/:id", isauthenticated, authorizeAdmin("admin"), deleteUser);
Router.post("/logout", userLogout);

module.exports = Router;
