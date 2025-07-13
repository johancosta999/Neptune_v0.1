const express = require("express");
const mongoose = require("mongoose");
const waterQualityRoutes = require("./Routes/WaterQualityRoutes");
const Water = require("./Model/WaterQuality");

const app = express();

// middleware
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/api/water", waterQualityRoutes);

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

setInterval(async () => {
  const randomPH = (Math.random() * 14).toFixed(2);         // 0 to 14
  const randomTDS = Math.floor(Math.random() * 1001);       // 0 to 1000
  const status = (randomTDS > 700 || randomPH < 5 || randomPH > 8) ? "unsafe" : "safe";
  const tankId = "tank001"; // or get from an array if you want to simulate multiple tanks

  const record = new Water({
    phLevel: randomPH,
    tds: randomTDS,
    status: status,
    timestamp: Date.now(),
    tankId: tankId,
  });

  try {
    await record.save();
    console.log(`✔️ Fake data inserted at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error("❌ Error inserting fake data:", err);
  }
}, 5 * 60 * 1000); // every 5 minutes
