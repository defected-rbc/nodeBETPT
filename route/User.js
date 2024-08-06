const express = require("express");
const {
  Signup,
  getAllUsers,
  getUserById,
  login,
} = require("../controller/User");

const router = express.Router();

router.post("/signup", Signup);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", login);

module.exports = router;
