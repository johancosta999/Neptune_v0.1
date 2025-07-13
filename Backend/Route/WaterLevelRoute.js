const express = require("express");
const router = express.Router();

//insert Model
const levelModel = require("../Model/WaterLevelModel");

//insert controller
const WaterLevelControl = require("../Controlers/WaterLevelControl");

router.get("/", WaterLevelControl.getallWaterlevel);
router.post("/", WaterLevelControl.addWaterLevel);
router.get("/:id", WaterLevelControl.getById);
router.put("/:id", WaterLevelControl.updateWaterLevel);
router.delete("/:id", WaterLevelControl.deleteWaterRecord);




//export
module.exports = router;
