
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIfeatures = require("../utils/apifeatures");


// Create product  ----> Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const productDetails = { ...req.body }
    productDetails.user = req.user.id;
    const product = await Product.create(productDetails);
    res.status(201).json({ success: true, message: "product created successfully", product })
})


// Get product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const itemsperpage = 3;
    const apifeature = new APIfeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(itemsperpage);

    const product = await apifeature.query;
    if (product.length > 0) {
        res.status(200).json({ success: true, products: product });
    } else {
        next(new ErrorHandler(404, "product not found"));
    }
})


// Update product  ----> Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(404, "product not found"))
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, updatedProduct })
})


// Delete product  ----> Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
})


// Get Single product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const productDetails = await Product.findById(req.params.id);
    if (!productDetails) {
        return res.status(500).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, productDetails });
})


// module.exports = getAllProducts;