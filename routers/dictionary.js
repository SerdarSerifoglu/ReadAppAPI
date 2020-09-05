const express = require("express");
const router = express.Router();
const {
  getAllWords,
  addWord,
  getAllWordsTrEng,
} = require("../controllers/dictionary");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAccessToRoute, getAllWords);
router.get("/treng", getAccessToRoute, getAllWordsTrEng);
router.post("/add", getAccessToRoute, addWord);

module.exports = router;
