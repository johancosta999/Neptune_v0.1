const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const WaterlevelRoutes = require("./Route/WaterLevelRoute");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/water", WaterlevelRoutes);

// Simulated water level percentage
let currentLevelPercent = 100;

// Simulate decreasing every 2 minutes
setInterval(() => {
  if (currentLevelPercent > 20) {
    currentLevelPercent -= 10;
  } else {
    currentLevelPercent = 100; // Refill when ≤ 20%
  }

  console.log("Updated Water Level:", currentLevelPercent + "%");
}, 1 * 60 * 1000); // 2 minutes


// API to get current level
/*app.get("/water-level", (req, res) => {
  res.json({
    tankName: "Main Tank",
    currentLevelPercent,
    status:
      currentLevelPercent <= 20
        ? "Refilling"
        : currentLevelPercent <= 40
        ? "Low"
        : "Normal",
    recordedAt: new Date(),
  });
});
*/
mongoose
  .connect(
    "mongodb+srv://admin01:CGSNncRIg7EkiYga@cluster0.bsrma85.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      
    });
  })
  .catch((err) => console.log(err));
