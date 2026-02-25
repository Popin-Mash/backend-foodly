const express = require("express");
const routes = require("./modules");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);

module.exports = app;
