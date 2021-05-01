const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//import route
const userRoutes = require("./routes/user");

// app
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("this is error =>", err));

//! middleware
app.use(morgan("dev"));
//Used to parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
