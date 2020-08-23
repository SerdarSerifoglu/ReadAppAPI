const express = require('express');
const router = express.Router();
const {
    getAllWords,
    addWord,
    getAllWordsTrEng1
} = require("../controllers/dictionary");
const { getAccessToRoute } = require('../middlewares/authorization/auth');

router.get("/", getAccessToRoute, getAllWords);
router.get("/treng1", getAccessToRoute, getAllWordsTrEng1);
router.post("/add", getAccessToRoute, addWord);

module.exports = router;