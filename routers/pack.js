const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  getAllPacks,
  addPack,
  addWord,
  getAllPacksForCombobox,
  getAllWordsByPack,
  getOneWordById,
  updateWord,
  getOneWordByMainWord,
} = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.get("/forCbx", getAccessToRoute, getAllPacksForCombobox);
router.get("/:packId/words", getAccessToRoute, getAllWordsByPack);
router.get("/:packId/words/:wordId", getAccessToRoute, getOneWordById);
router.get("/:packId/word/:word", getAccessToRoute, getOneWordByMainWord);

router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", getAccessToRoute, addWord);

router.put("/:packId/word", getAccessToRoute, updateWord);
module.exports = router;
