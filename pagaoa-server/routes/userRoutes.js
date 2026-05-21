const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

// PUBLIC
router.post("/", createUser);
router.post("/login", loginUser);

// PROTECTED
router.get("/", auth, authorize("admin"), getUsers);

router.put("/:id", auth, authorize("admin", "editor"), updateUser);

router.delete("/:id", auth, authorize("admin"), deleteUser);

module.exports = router;
