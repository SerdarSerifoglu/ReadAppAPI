const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  getAllArticle,
  getArticleById,
  getArticleByTitle,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.js");

router.get("/", getAccessToRoute, getAllArticle);
router.get("/:articleId", getAccessToRoute, getArticleById);
router.get("/title/:articleTitle", getAccessToRoute, getArticleByTitle);

router.post("/add", getAccessToRoute, addArticle);

router.put("/add", getAccessToRoute, updateArticle);

router.delete("/:articleId", getAccessToRoute, deleteArticle);

module.exports = router;
