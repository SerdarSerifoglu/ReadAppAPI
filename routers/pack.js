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
  getAllUsersPacks,
  updateWord,
  getOneWordByMainWord,
  deleteWord,
  sharePack,
  updatePack,
  deletePack,
  getAllSharedPacks,
} = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.get("/forCbx", getAccessToRoute, getAllPacksForCombobox);
router.get("/:packId/words", getAccessToRoute, getAllWordsByPack);
router.get("/:packId/words/:wordId", getAccessToRoute, getOneWordById);
router.get("/:packId/word/:word", getAccessToRoute, getOneWordByMainWord);
router.get("/getAllUsersPacks", getAccessToRoute, getAllUsersPacks);
router.get("/getAllSharedPacks", getAccessToRoute, getAllSharedPacks);

router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", [getAccessToRoute, checkWordExist], addWord);

router.put("/:packId/word", getAccessToRoute, updateWord);
router.put("/:packId/shared", getAccessToRoute, sharePack);
router.put("/:packId", getAccessToRoute, updatePack);

router.delete("/:packId/word/:wordId", getAccessToRoute, deleteWord);
router.delete("/:packId", getAccessToRoute, deletePack);

module.exports = router;
