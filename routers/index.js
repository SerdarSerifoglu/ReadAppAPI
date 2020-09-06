const express = require("express");
// const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const dictionary = require("./dictionary");
const pack = require("./pack");
const word = require("./word");
// const admin = require('./admin');

const router = express.Router();

// router.use("/question", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/dic", dictionary);
router.use("/pack", pack);
router.use("/word", word);
// router.use("/admin", admin);

module.exports = router;
