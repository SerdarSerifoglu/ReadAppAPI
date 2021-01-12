const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSettingsSchema = new Schema({
  selectedPackId: {
    type: String,
  },
  wordColor: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("UserSettings", UserSettingsSchema);
