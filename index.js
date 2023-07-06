require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const wishlistRouter = require("./routes/wishlist");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const menuItemRouter = require("./routes/menuItem");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.headers["access-control-request-private-network"]) {
    res.header("Access-Control-Allow-Private-Network", "true");
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(express.static(path.join(__dirname, "./admin/dist")));

app.use("/product", productsRouter);
app.use("/auth", authRouter);
app.use("/user-wishlist", wishlistRouter);
app.use("/user-cart", cartRouter);
app.use("/user-checkout", checkoutRouter);
app.use("/nav-menu", menuItemRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./admin/dist/index.html"));
});
app.listen(3000, () => console.log("Server Started"));
