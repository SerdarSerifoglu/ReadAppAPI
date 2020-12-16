const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkWordExist } = require("../middlewares/database/databaseErrorHelpers");
const {
  getAllPacks,
  addPack,
  addWord,
  getAllPacksForCombobox,
  getAllWordsByPack,
  getOneWordById,
  updateWord,
  getOneWordByMainWord,
  deleteWord,
} = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.get("/forCbx", getAccessToRoute, getAllPacksForCombobox);
router.get("/:packId/words", getAccessToRoute, getAllWordsByPack);
router.get("/:packId/words/:wordId", getAccessToRoute, getOneWordById);
router.get("/:packId/word/:word", getAccessToRoute, getOneWordByMainWord);

router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", [getAccessToRoute, checkWordExist], addWord);

router.put("/:packId/word", getAccessToRoute, updateWord);

router.delete("/:packId/word/:wordId", getAccessToRoute, deleteWord);
module.exports = router;
