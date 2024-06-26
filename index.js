const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000 || process.env.PORT;

// Enable CORS for all origins
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

app.get("/", async (req, res) => {
  res.json({ message: "server is running" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
  });
});
