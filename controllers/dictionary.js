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

const getAllWordsTrEng = asyncErrorWrapper(async (req,res,next) => {
    const words = await Dictionary.find({userId:req.user.id}).select("valTr1 valEng1");
    res.status(200).json({
        success: true,
        data: words
    });
});

const addWord = asyncErrorWrapper(async (req,res,next) => {
    const incomingData = req.body;
    const addedWord = await Dictionary.create({
        ...incomingData,
        userId: req.user.id
    });

    return res.status(200)
    .json({
        success: true,
        data: addedWord
    });
});

module.exports = {
    getAllWords,
    addWord,
    getAllWordsTrEng
}