// const getAllProducts = require("../controllers/productController");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const authentication = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const express = require("express");
const Router = express.Router();

Router.get("/products", authentication, authorizeAdmin("admin"), getAllProducts);
Router.post("/products/new", createProduct);
Router.put("/products/:id", updateProduct);
Router.delete("/products/:id", deleteProduct);
Router.get("/products/:id", getProductDetails);

module.exports = Router;