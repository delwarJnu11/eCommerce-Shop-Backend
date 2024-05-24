const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000 || process.env.PORT;

//middleware

// Enable CORS for all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://shopee-coral-one.vercel.app"
      : "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
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
