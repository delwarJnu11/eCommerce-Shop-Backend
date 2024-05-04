const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000 || process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
  });
});
