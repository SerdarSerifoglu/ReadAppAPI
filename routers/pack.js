const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { getAllPacks, addPack, addWord } = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.post("/add", getAccessToRoute, addPack);
router.post("/:packId/word", getAccessToRoute, addWord);
module.exports = router;
