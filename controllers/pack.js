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

module.exports = {
  getAllPacks,
  getAllPacksForCombobox,
  addPack,
  addWord,
  getAllWordsByPack,
};
