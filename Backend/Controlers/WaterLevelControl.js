const WaterLevelModel = require("../Model/WaterLevelModel");
const Waterlevel = require("../Model/WaterLevelModel");

const getallWaterlevel = async (req, res, next) => {
  const { tankId } = req.query;

  let data;
  //get all data
  try {
    data = await WaterLevelModel.find();
    if (tankId) {
      data = await WaterLevelModel.find({ tankId: tankId });
    } else {
      data = await WaterLevelModel.find();
    }
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
  if (!data) {
    return res.status(404).json({ message: "No water Level records found." });
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
  return res.status(200).json({ data });
};

//insert data
const addWaterLevel = async (req, res, next) => {
  const { tankId, currentLevel, maxCapacity, location, status, recordedAt } =
    req.body;

  try {
    const newRecord = new Waterlevel({
      tankId,
      currentLevel,
      maxCapacity,
      location,
      status,
      recordedAt,
    });
    await newRecord.save();
    res.status(200).json(newRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get ById
const getById = async(req , res, next) =>{
  const id = req.params.id;

  let record;
  try {
    record = await WaterLevelModel.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!record) {
    return res.status(404).json({ message: "No water quality data found for that ID." });
  }
  return res.status(200).json({ record });
  

};
// Update Record
const updateWaterLevel = async (req, res, next) => {
  const id = req.params.id;
  const {  tankId,location, status } = req.body;

  let record;
  try {
    record = await WaterLevelModel.findByIdAndUpdate(id, {
      tankId,
      location,
      status
    }, { new: true });
  } catch (err) {
    console.log(err);
  }

  if (!record) {
    return res.status(404).json({ message: "Cannot update. Data not found." });
  }
  return res.status(200).json({ record });
};
//Delete Record
const deleteWaterRecord = async (req, res, next) => {
  const id = req.params.id;

  let record;
  try {
    record = await WaterLevelModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!record) {
    return res.status(404).json({ message: "Cannot delete. Data not found." });
  }
  return res.status(200).json({ message: "Water quality data deleted successfully." });
};

exports.getallWaterlevel = getallWaterlevel;
exports.addWaterLevel = addWaterLevel;
exports.getById = getById;
exports.updateWaterLevel = updateWaterLevel;
exports.deleteWaterRecord = deleteWaterRecord;

