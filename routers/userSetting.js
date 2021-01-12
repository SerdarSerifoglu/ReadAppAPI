const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { getUserSetting, addUserSetting, updateUserSetting } = require("../controllers/userSettings");

router.get("/:userSettingId", getAccessToRoute, getUserSetting);

router.post("/add", getAccessToRoute, addUserSetting);

router.put("/", getAccessToRoute, updateUserSetting);

module.exports = router;
