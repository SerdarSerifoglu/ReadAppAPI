const Pack = require("../models/Pack");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getAllPacks = asyncErrorWrapper(async (req, res, next) => {
  //Daha sonra subscriberIds array'inin kontrolü sağlanıcak.
  const packs = await Pack.find({ ownerId: req.user.id });
  res.status(200).json({
    success: true,
    data: packs,
  });
});

const getAllPacksForCombobox = asyncErrorWrapper(async (req, res, next) => {
  const packs = await Pack.find({ ownerId: req.user.id }, "title");
  res.status(200).json({
    success: true,
    data: packs,
  });
});

const getAllWordsByPack = asyncErrorWrapper(async (req, res, next) => {
  const words = await Pack.find(
    {
      ownerId: req.user.id,
      _id: req.params.packId,
    },
    "words"
  );
  res.status(200).json({
    success: true,
    data: words,
  });
});

const getOneWordById = asyncErrorWrapper(async (req, res, next) => {
  const words = await Pack.find(
    {
      ownerId: req.user.id,
      _id: req.params.packId,
    },
    "words"
  );
  var word = words[0].words.filter((x) => x._id == req.params.wordId);

  res.status(200).json({
    success: true,
    data: word,
  });
});

const addPack = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  const addedPack = await Pack.create({
    ...incomingData,
    ownerId: req.user.id,
  });

  return res.status(200).json({
    success: true,
    data: addedPack,
  });
});

const addWord = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const incomingData = req.body;
  const pack = await Pack.findById({ _id: packId });
  pack.words.push(incomingData);
  await pack.save();
  res.status(200).json({
    success: true,
    message: "Word Added",
  });
});

const updateWord = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const incomingData = req.body;
  const pack = await Pack.findById({ _id: packId });
  // var word = pack.words.filter((x) => x._id == incomingData._id);
  for (let i = 0; i < pack.words.length; i++) {
    if (pack.words[i].id == incomingData._id) {
      pack.words[i] = {
        ...pack.words[i],
        ...incomingData,
      };
    }
  }

  await pack.save();
  res.status(200).json({
    success: true,
    message: "Word Updated",
  });
});

module.exports = {
  getAllPacks,
  getAllPacksForCombobox,
  addPack,
  addWord,
  getAllWordsByPack,
  getOneWordById,
  updateWord,
};