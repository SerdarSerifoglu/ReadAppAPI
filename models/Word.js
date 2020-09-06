const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WordSchema = new Schema({
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
  packId: {
    type: String,
    required: [true, "Please provide a packId"],
  },
});

module.exports = mongoose.model("Word", WordSchema);
