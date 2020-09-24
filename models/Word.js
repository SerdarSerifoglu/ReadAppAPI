const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Word = new Schema({
  mainWord: {
    type: String,
    required: true,
  },
  secondaryWord: {
    type: String,
    required: true,
  },
  mainWordAF: {
    type: String,
  },
  secondaryWordAF: {
    type: String,
  },
});

module.exports = Word;
