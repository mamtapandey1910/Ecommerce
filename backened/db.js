const express = require("express");
const mongoose = require("mongoose");

const app1 = express();
app1.use(express.json());

const db = () => {
    mongoose.connect("mongodb://127.0.0.1/Ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res => {
        console.log("connected to mongodb")
    })
}


module.exports = db;