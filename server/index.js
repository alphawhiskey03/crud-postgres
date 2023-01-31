const express = require("express");
const cors = require("cors");
const db = require("./db");
const orderRoutes = require("./routes/orders/");
const productRoutes = require("./routes/products/");
require("dotenv").config();
const app = express();
app.listen(process.env.SERVER_PORT);
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "hi there!" });
});
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
