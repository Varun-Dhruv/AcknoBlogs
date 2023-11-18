const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "*",
  method: "*",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res, next) => {
  return res.status(200).send("Alive and Kickin!");
});

app.use(express.static("static"));

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {});
    console.log(`Server running on port: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
