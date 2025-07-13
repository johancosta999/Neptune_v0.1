const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./Route/UserRoutes");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);  // ✅ Mounts /users path

mongoose
  .connect("mongodb+srv://Admin:dkubgcRMUoVYupDc@cluster0.rbj05df.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
