const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "price cannot exceed 8 digit"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    stock: {
        type: Number,
        required: true,
        maxLength: [4, "Stock cannot exceed 4 digit"],
        default: 1,
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        }

    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("product", productSchema);
