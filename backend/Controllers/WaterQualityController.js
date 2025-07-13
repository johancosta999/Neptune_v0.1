const WaterQuality = require("../Model/WaterQuality");


const getAllWaterQuality = async (req, res, next) => {
  const { tankId } = req.query;  // get tankId from query

  let data;
  try {
    if (tankId) {
      data = await WaterQuality.find({ tankId: tankId });
    } else {
      data = await WaterQuality.find(); // fallback: return all
    }
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getById = async (req, res, next) => {
  const id = req.params.id;
  let record;
  try {
    record = await WaterQuality.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!record) {
    return res.status(404).json({ message: "No water quality data found for that ID." });
  }
  return res.status(200).json({ record });
};


const addWaterQuality = async (req, res, next) => {
  const { tankId, phLevel, tds, status, timestamp } = req.body;

  try {
    const newRecord = new WaterQuality({
      tankId,
      phLevel,
      tds,
      status,
      timestamp,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const updateWaterQuality = async (req, res, next) => {
  const id = req.params.id;
  const { phLevel, tds, status } = req.body;

  let record;
  try {
    record = await WaterQuality.findByIdAndUpdate(id, {
      phLevel,
      tds,
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


const deleteWaterQuality = async (req, res, next) => {
  const id = req.params.id;

  let record;
  try {
    record = await WaterQuality.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!record) {
    return res.status(404).json({ message: "Cannot delete. Data not found." });
  }
  return res.status(200).json({ message: "Water quality data deleted successfully." });
};

// exports
exports.getAllWaterQuality = getAllWaterQuality;
exports.getById = getById;
exports.addWaterQuality = addWaterQuality;
exports.updateWaterQuality = updateWaterQuality;
exports.deleteWaterQuality = deleteWaterQuality;
