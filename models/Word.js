const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Word = new Schema({
  firstWordValue: {
    type: String,
    required: true,
  },
  secondWordValue: {
    type: String,
    required: true,
  },
  firstWordAF: {
    type: String,
  },
  secondWordAF: {
    type: String,
  },
});

module.exports = Word;
