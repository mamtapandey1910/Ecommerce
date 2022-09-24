const express = require("express");
const { userRegistration, userLogin } = require("../controllers/userController");
const Router = express.Router();

Router.post("/register", userRegistration);
Router.post("/login", userLogin);

module.exports = Router;