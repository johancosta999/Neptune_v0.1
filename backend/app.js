
const express = require("express");
const mongoose = require("mongoose");
const sellerRoute = require("./Routes/sellerRoute");
const Water = require("./Models/sellerModel");

const app = express();


// middleware
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/api/sellers", sellerRoute);

// connect to MongoDB and start server
mongoose
  .connect("mongodb+srv://admin1:cLp3Hz3s8ElUMOIP@merncluster.8dgv3ew.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));


