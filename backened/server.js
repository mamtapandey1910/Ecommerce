const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");

// const app = express();
app.use(express.json());

// Uncaught errors
process.on("uncaughtException", (err) => {
    console.log(err.message);
    process.exit(1);
})

// configuring env file
dotenv.config({ path: "./config/config.env" })

const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})



// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(err.message)
    server.close(() => {
        process.exit(1);
    })
})


