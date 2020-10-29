const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { getAllArticle, getArticleById, addArticle, updateArticle } = require("../controllers/article.js");

router.get("/", getAccessToRoute, getAllArticle);
router.get("/:articleId", getAccessToRoute, getArticleById);

router.post("/add", getAccessToRoute, addArticle);

router.put("/add", getAccessToRoute, updateArticle);

module.exports = router;
