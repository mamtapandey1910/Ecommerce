// const getAllProducts = require("../controllers/productController");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const express = require("express");
const Router = express.Router();

Router.post("/products/new", createProduct);
Router.get("/products", getAllProducts);
Router.put("/products/:id", updateProduct);
Router.delete("/products/:id", deleteProduct);
Router.get("/products/:id", getProductDetails);

module.exports = Router;