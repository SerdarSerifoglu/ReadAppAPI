const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  getAllPacks,
  addPack,
  addWord,
  getAllPacksForCombobox,
  getAllWordsByPack,
} = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.get("/forCbx", getAccessToRoute, getAllPacksForCombobox);
router.get("/:packId/words", getAccessToRoute, getAllWordsByPack);
router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", getAccessToRoute, addWord);
module.exports = router;
