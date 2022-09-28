// const getAllProducts = require("../controllers/productController");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const authentication = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const express = require("express");
const Router = express.Router();

Router.get("/products", getAllProducts);
Router.post("/products/new", authentication, authorizeAdmin("admin"), createProduct);
Router.put("/products/:id", authentication, authorizeAdmin("admin"), updateProduct);
Router.delete("/products/:id", authentication, authorizeAdmin("admin"), deleteProduct);
Router.get("/products/:id", getProductDetails);

module.exports = Router;