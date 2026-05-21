const express = require("express");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const router = express.Router();

// Public
router.get("/", getArticles);

// Protected
router.post("/", auth, authorize("admin", "editor"), createArticle);

router.put("/:id", auth, authorize("admin", "editor"), updateArticle);

router.delete("/:id", auth, authorize("admin", "editor"), deleteArticle);

module.exports = router;
