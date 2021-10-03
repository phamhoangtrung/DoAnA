const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ItemRoute = require("./api/item/routes");
const UserRoute = require("./api/user/routes");
const CartRoute = require("./api/cart/routes");


require("dotenv/config");

app.use(express.json());
app.use("/api/v1/item", ItemRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/cart", CartRoute);



const port = 3000;

const start = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  });
  await app.listen(port);
  console.log("Server start...");
};

start();
