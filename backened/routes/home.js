// const { Router } = require("express");
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("hello world")
})

module.exports = Router;