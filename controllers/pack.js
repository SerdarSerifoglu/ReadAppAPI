const Pack = require("../models/Pack");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const mongoose = require("mongoose");

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

const getAllUsersPacks = asyncErrorWrapper(async (req, res, next) => {
  const packs = await Pack.find({ ownerId: req.user.id }, "title description isShared");
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

const getOneWordByMainWord = asyncErrorWrapper(async (req, res, next) => {
  const words = await Pack.find(
    {
      ownerId: req.user.id,
      _id: req.params.packId,
    },
    "words"
  );
  const word = words[0].words.filter((x) => x.mainWord.toLowerCase() === req.params.word.toLowerCase());

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

const updatePack = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const incomingData = req.body;
  const pack = await Pack.findById({ _id: packId });
  pack.title = incomingData.title;
  pack.description = incomingData.description;
  await pack.save();
  res.status(200).json({
    success: true,
    message: "Pack Updated",
  });
});

const deletePack = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const pack = await Pack.findById({ _id: packId });
  await pack.remove();

  res.status(200).json({
    success: true,
    message: "Pack Deleted",
  });
});

const addWord = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const incomingData = req.body;
  if (typeof incomingData.mainWord === "string") {
    incomingData.mainWord = incomingData.mainWord.trim();
  }
  if (typeof incomingData.secondaryWord === "string") {
    incomingData.secondaryWord = incomingData.secondaryWord.trim();
  }
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

const sharePack = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const incomingData = req.body;
  const pack = await Pack.findById({ _id: packId });
  pack.isShared = !pack.isShared;
  await pack.save();
  res.status(200).json({
    success: true,
    message: pack.isShared ? "Pack Shared" : "Pack Sharing Canceled",
  });
});

const deleteWord = asyncErrorWrapper(async (req, res, next) => {
  const packId = req.params.packId;
  const wordId = req.params.wordId;

  const pack = await Pack.findById({ _id: packId });

  const index = pack.words.findIndex((x) => x._id == wordId);
  if (index > -1) {
    pack.words.splice(index, 1);
  }

  await pack.save();
  res.status(200).json({
    success: true,
    message: "Word Deleted",
  });
});

const getAllSharedPacks = asyncErrorWrapper(async (req, res, next) => {
  const packs = await Pack.find({ isShared: true }, "title description isShared copyCount");
  res.status(200).json({
    success: true,
    data: packs,
  });
});

const packCopy = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  if (incomingData != null && incomingData.packId != undefined && incomingData.packId != null) {
    console.log(incomingData.packId);
    const pack = await Pack.findById({ _id: incomingData.packId });
    var clonePack = pack;
    clonePack._id = mongoose.Types.ObjectId();
    clonePack.ownerId = req.user.id;
    clonePack.isShared = false;
    clonePack.copyCount = 0;
    clonePack.isNew = true;
    await clonePack.save();

    const mainPack = await Pack.findById({ _id: incomingData.packId });
    mainPack.copyCount += 1;
    await mainPack.save();

    res.status(200).json({
      success: true,
      data: { clonePack, mainPack },
    });
  }
});

module.exports = {
  getAllPacks,
  getAllPacksForCombobox,
  addPack,
  addWord,
  getAllWordsByPack,
  getOneWordById,
  updateWord,
  getOneWordByMainWord,
  deleteWord,
  getAllUsersPacks,
  sharePack,
  updatePack,
  deletePack,
  getAllSharedPacks,
  packCopy,
};
