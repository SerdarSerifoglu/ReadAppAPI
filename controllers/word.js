const Word = require("../models/Word");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllWordsOnPackage = asyncErrorWrapper(async (req, res, next) => {
  console.log(req.query);
  console.log(req.params);

  const words = await Word.find({});
  res.status(200).json({
    success: true,
    data: words,
  });
});

const addWord = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  const addedWord = await Word.create({
    ...incomingData,
    packId: req.params.packId,
  });
  return res.status(200).json({
    success: true,
    data: addedWord,
  });
});

module.exports = {
  getAllWordsOnPackage,
  addWord
};
