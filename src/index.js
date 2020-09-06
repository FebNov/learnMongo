require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./utils/db");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", routes);
connectToDB();
app.listen(3000, () => {
  console.log("listening on port 3000");
});
