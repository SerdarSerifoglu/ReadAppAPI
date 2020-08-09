const express = require('express');
const router = express.Router();
const {
    getAllWords,
    addWord
} = require("../controllers/dictionary");
const { getAccessToRoute } = require('../middlewares/authorization/auth');

router.get("/", getAccessToRoute, getAllWords);
router.post("/add", getAccessToRoute, addWord);

module.exports = router;