const express = require("express");
const router = express.Router();
const UserControllers = require("../Controllers/UserControllers");

router.get("/", UserControllers.getAllUsers);         // ✅ /users
router.post("/", UserControllers.addUsers);
router.get("/:id", UserControllers.getById);
router.put("/:id", UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);

module.exports = router;
