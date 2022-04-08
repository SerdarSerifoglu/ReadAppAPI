const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Word = new Schema(
  {
    mainWord: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryWord: {
      type: String,
      required: true,
      trim: true,
    },
    mainWordAF: {
      type: String,
    },
    secondaryWordAF: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Word;
