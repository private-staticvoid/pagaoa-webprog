const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "firstName email");

    res.json({ articles });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createArticle = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized - missing user",
      });
    }

    // Only admin/editor
    if (req.user.type !== "admin" && req.user.type !== "editor") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const { name, title, content, imageUrl } = req.body;
    if (!name || !title || !content || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Name, title, content, and imageUrl are required" });
    }
    const article = await Article.create({
      name,
      title,
      content,
      imageUrl,
      author: req.user.id,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Ownership/Admin check
    if (
      req.user.type !== "admin" &&
      article.author?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Allowed fields only
    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.title) updates.title = req.body.title;
    if (req.body.content) updates.content = req.body.content;
    if (req.body.imageUrl) updates.imageUrl = req.body.imageUrl;
    if (req.body.category) updates.category = req.body.category;
    if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true },
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // Ownership/Admin check
    if (
      req.user.type !== "admin" &&
      article.author?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
