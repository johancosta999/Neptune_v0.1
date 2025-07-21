const express = require("express");
const router = express.Router();

const {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  getStaffById,
} = require("../controller/staffController");

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

module.exports = router;
