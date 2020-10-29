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

module.exports = {
  getAllArticle,
  getArticleById,
  addArticle,
  updateArticle,
};
