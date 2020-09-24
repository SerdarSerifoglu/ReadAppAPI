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
} = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.get("/forCbx", getAccessToRoute, getAllPacksForCombobox);
router.get("/:packId/words", getAccessToRoute, getAllWordsByPack);
router.get("/:packId/words/:wordId", getAccessToRoute, getOneWordById);

router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", getAccessToRoute, addWord);

router.put("/:packId/word", getAccessToRoute, updateWord);
module.exports = router;
