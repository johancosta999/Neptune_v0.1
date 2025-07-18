const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const WaterlevelRoutes = require("./Route/WaterLevelRoute");
const WaterLevel = require("./Model/WaterLevelModel");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/water", WaterlevelRoutes);

// Function to generate a random water level between 20% and 100%
function generateRandomLevel() {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20; // random int 20-100
}

// Tanks to simulate
const tankIds = ["tank001", "tank002"];

// Function to auto-generate and save water levels every 1 minute
async function generateWaterLevels() {
  for (const tankId of tankIds) {
    const newLevel = generateRandomLevel();

    try {
      const newRecord = new WaterLevel({
        tankId: tankId,
        currentLevel: newLevel,
        timestamp: new Date(),
      });
      await newRecord.save();
      console.log(`Generated new level for ${tankId}: ${newLevel}%`);
    } catch (error) {
      console.error(`Error saving water level for ${tankId}:`, error);
    }
  }
}

// Run immediately on start
generateWaterLevels();

// Schedule generation every 1 minute (60000 ms)
setInterval(generateWaterLevels, 60 * 1000);

mongoose
  .connect(
    "mongodb+srv://admin01:CGSNncRIg7EkiYga@cluster0.bsrma85.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));


  //"mongodb+srv://admin01:CGSNncRIg7EkiYga@cluster0.bsrma85.mongodb.net/"