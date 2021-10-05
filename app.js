const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ItemRoute = require("./api/item/routes");
const UserRoute = require("./api/user/routes");
const CartRoute = require("./api/cart/routes");

const interceptor = require("./shared/middleware/interceptor");
const errorHandlerMiddleware = require("./shared/middleware/error-handler");

require("dotenv/config");

app.use(express.json());
app.use("/api/v1/item", ItemRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/cart", CartRoute);

// API Response interceptor
app.use(interceptor);

// Error handler middleware
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  const dbConnet = mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  });
  const serverConnect = app.listen(port);
  await Promise.all([dbConnet, serverConnect]);
  console.log("Server start...");
};

start();
