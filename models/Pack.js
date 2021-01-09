const mongoose = require("mongoose");
const Word = require("./Word");

const Schema = mongoose.Schema;

const PackSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    ownerId: {
      type: String,
      required: [true, "Please provide a ownerId"],
    },
    subscriberIds: {
      type: [String],
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    words: [Word],
    copyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pack", PackSchema);
