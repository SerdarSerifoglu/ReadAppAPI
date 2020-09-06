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
module.exports = {
  getAllPacks,
  addPack,
};
