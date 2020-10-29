const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: [true, "Please provide a ownerId"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
