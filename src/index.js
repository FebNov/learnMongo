require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./utils/db");
const routes = require("./routes");
const { required } = require("joi");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());

app.use("/api", routes);
connectToDB();
app.use(errorHandler);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
