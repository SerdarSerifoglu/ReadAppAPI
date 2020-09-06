const express = require("express");
const router = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { getAllPacks, addPack } = require("../controllers/pack");

router.get("/", getAccessToRoute, getAllPacks);
router.post("/add", getAccessToRoute, addPack);
module.exports = router;
