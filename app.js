const express = require("express");
const app = express();
const mongoose = require("mongoose");

const itemRoute = require("./api/item/routes");
const userRoute = require("./api/user/routes");

require("dotenv/config");

app.use(express.json());
app.use("/api/v1/item", itemRoute);
app.use("/api/v1/user", userRoute);

const port = 3000;

const start = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  });
  await app.listen(port);
  console.log("Server start...");
};

start();
