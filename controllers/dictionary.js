const Dictionary = require('../models/Dictionary');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const getAllWords = asyncErrorWrapper(async (req,res,next) => {
    const words = await Dictionary.find({userId:req.user.id});
    res.status(200).json({
        success: true,
        data: words
    });
});

const addWord = asyncErrorWrapper(async (req,res,next) => {
    const incomingData = req.body;
    const addedWord = await Dictionary.create({
        ...incomingData
    });

    return res.status(200)
    .json({
        success: true,
        data: addedWord
    });
});

module.exports = {
    getAllWords,
    addWord
}