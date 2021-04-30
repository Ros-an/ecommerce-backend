const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// app
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("this is eror", err));

// routes
app.get("/", (req, res) => {
  res.send("Hello Roshan! kya hal chal");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
