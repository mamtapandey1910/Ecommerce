const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");

db()
app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/", require("./routes/home"));
app.use("/api/user", require("./routes/userRouter"));
app.use("/api", require("./routes/productRouter"));


// middleware
app.use(errorMiddleware);

module.exports = app;