const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./route/User");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const mongoconn = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TPT");
    console.log("Connected to db");
  } catch (error) {
    console.log("Error while connecting", error);
  }
};
mongoconn();

app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
