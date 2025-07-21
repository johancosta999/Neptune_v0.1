const express = require("express");
const router = express.Router();
const {generateUserQR} = require("../controller/qrController");

router.get("/:userId", generateUserQR);

module.exports = router;