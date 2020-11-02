const Article = require("../models/Article.js");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllArticle = asyncErrorWrapper(async (req, res, next) => {
  const articles = await Article.find({ ownerId: req.user.id });
  res.status(200).json({
    success: true,
    data: articles,
  });
});

const getArticleById = asyncErrorWrapper(async (req, res, next) => {
  const articleId = req.params.articleId;
  const articles = await Article.find({ _id: articleId, ownerId: req.user.id });
  res.status(200).json({
    success: true,
    data: articles,
  });
});

const getArticleByTitle = asyncErrorWrapper(async (req, res, next) => {
  const articleTitle = req.params.articleTitle;
  const article = await Article.find({ title: articleTitle, ownerId: req.user.id });
  res.status(200).json({
    success: true,
    data: article,
  });
});

const addArticle = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  const addedArticle = await Article.create({
    ...incomingData,
    ownerId: req.user.id,
  });

  return res.status(200).json({
    success: true,
    data: addedArticle,
  });
});

const updateArticle = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  console.log(incomingData);
  const article = await Article.findByIdAndUpdate(incomingData._id, incomingData, {
    new: true,
    runValidators: true,
  });

  console.log(article);

  res.status(200).json({
    success: true,
    message: article,
  });
});

const deleteArticle = asyncErrorWrapper(async (req, res, next) => {
  const articleId = req.params.articleId;

  const article = await Article.deleteOne({ _id: articleId, ownerId: req.user.id }, function (err) {
    if (err) {
      console.log(err);
      return new CustomError(err, 400);
    }
  });
  if (article.deletedCount > 0) {
    res.status(200).json({
      success: true,
      message: "Article is deleted",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Article is not found",
    });
  }
});

module.exports = {
  getAllArticle,
  getArticleById,
  getArticleByTitle,
  addArticle,
  updateArticle,
  deleteArticle,
};
