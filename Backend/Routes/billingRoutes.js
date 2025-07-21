const express = require("express");
const router = express.Router();

const {
  createBill,
  createCalculatedBill,
  getAllBills,
  getBillsByUser,
  updateBill,
  deleteBill,
  getBillingById,
} = require("../controller/billingController");

router.post("/", createBill);
router.post("/calculate", createCalculatedBill);
router.get("/", getAllBills);
router.get("/user/:userId", getBillsByUser);
router.get("/:id", getBillingById)
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;
