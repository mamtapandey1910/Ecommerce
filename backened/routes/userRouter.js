const express = require("express");
const { userRegistration, userLogin, userLogout } = require("../controllers/userController");
const Router = express.Router();

Router.post("/register", userRegistration);
Router.post("/login", userLogin);
Router.post("/logout", userLogout);

module.exports = Router;
