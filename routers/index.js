const express = require("express");
// const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const dictionary = require("./dictionary");
const pack = require("./pack");
const article = require("./article");
// const admin = require('./admin');

const router = express.Router();

// router.use("/question", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/dic", dictionary);
router.use("/pack", pack);
router.use("/article", article);
// router.use("/admin", admin);

module.exports = router;
