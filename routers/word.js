const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { getAllWordsOnPackage, addWord } = require("../controllers/word");

router.get("/pack/:packId", getAccessToRoute, getAllWordsOnPackage);
router.post("/pack/:packId/add", getAccessToRoute, addWord);
module.exports = router;
