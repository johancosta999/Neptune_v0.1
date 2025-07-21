const Staff = require("../Models/Staff");

// Create a new staff member
const createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json(staff);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Get single staff by ID
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all staff
const getAllStaff = async (req, res) => {
    try {
        const staffList = await Staff.find();
        res.json(staffList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update staff by id
const updateStaff = async (req, res) => {
    try {
        const updateStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateStaff);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete staff by id
const deleteStaff = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ message: "Staff member deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    updateStaff,
    deleteStaff,
    getStaffById,
};