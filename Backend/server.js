const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Start server
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Import Routes
const userRoutes = require("./Routes/userRoutes");
const staffRoutes = require("./Routes/staffRoutes");
const billingRoutes = require("./Routes/billingRoutes");
const qrRoutes = require("./Routes/qrRoutes");

//Use routes
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/qr", qrRoutes);

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDb connected...."))
  .catch((err) => console.error("Connection error:", err));

app.get("/", (req, res) => {
  res.send("smart water management api is running ...");
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
