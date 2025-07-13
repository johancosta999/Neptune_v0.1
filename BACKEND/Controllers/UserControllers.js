const User = require("../Model/UserModel");

// ✅ Get all users
const getAllUsers = async (req, res, next) => {
   try {
      const users = await User.find();
      return res.status(200).json(users); // Always return 200 with empty array if none
   } catch (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error fetching users" });
   }
};

// ✅ Add new user
const addUsers = async (req, res, next) => {
   const { name, gmail, age, Address } = req.body;

   try {
      const newUser = new User({ name, gmail, age, Address });
      await newUser.save();
      return res.status(201).json(newUser);
   } catch (err) {
      console.error("Error adding user:", err);
      return res.status(500).json({ message: "Unable to add user" });
   }
};

// ✅ Get user by ID
const getById = async (req, res, next) => {
   const { id } = req.params;

   try {
      const user = await User.findById(id);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
   } catch (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ message: "Error retrieving user" });
   }
};

// ✅ Update user by ID
const updateUser = async (req, res, next) => {
   const { id } = req.params;
   const { name, gmail, age, Address } = req.body;

   try {
      const updatedUser = await User.findByIdAndUpdate(
         id,
         { name, gmail, age, Address },
         { new: true }
      );

      if (!updatedUser) {
         return res.status(404).json({ message: "User not found or update failed" });
      }

      return res.status(200).json(updatedUser);
   } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ message: "Error updating user" });
   }
};

// ✅ Delete user by ID
const deleteUser = async (req, res, next) => {
   const { id } = req.params;

   try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
         return res.status(404).json({ message: "User not found or delete failed" });
      }
      return res.status(200).json(deletedUser);
   } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Error deleting user" });
   }
};

// ✅ Export all controller functions
module.exports = {
   getAllUsers,
   addUsers,
   getById,
   updateUser,
   deleteUser
};
