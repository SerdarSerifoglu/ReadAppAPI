const UserSetting = require("../models/UserSettings");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getUserSetting = asyncErrorWrapper(async (req, res, next) => {
  const userSetting = await UserSetting.findOne({ userId: req.user.id });
  res.status(200).json({
    success: true,
    data: userSetting,
  });
});

const addUserSetting = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  const addedUserSetting = await UserSetting.create({
    ...incomingData,
    userId: req.user.id,
  });

  return res.status(200).json({
    success: true,
    message: "User Setting Added",
    data: addedUserSetting,
  });
});

const updateUserSetting = asyncErrorWrapper(async (req, res, next) => {
  const incomingData = req.body;
  const userSetting = await UserSetting.findById({ _id: incomingData._id });
  userSetting.selectedPackId = incomingData.selectedPackId;
  userSetting.wordColor = incomingData.wordColor;
  await userSetting.save();
  res.status(200).json({
    success: true,
    message: "User Setting Updated",
  });
});

module.exports = {
  getUserSetting,
  addUserSetting,
  updateUserSetting,
};
