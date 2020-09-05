const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DictionarySchema = new Schema({
  valEng1: {
    type: String,
    maxlength: 500,
  },
  valEng2: {
    type: String,
    maxlength: 500,
  },
  valEngAF: {
    type: String,
    maxlength: 500,
  },
  valTr1: {
    type: String,
    maxlength: 500,
  },
  valTr2: {
    type: String,
    maxlength: 500,
  },
  valTrAF: {
    type: String,
    maxlength: 500,
  },
  valEsp1: {
    type: String,
    maxlength: 500,
  },
  valEsp2: {
    type: String,
    maxlength: 500,
  },
  valEspAF: {
    type: String,
    maxlength: 500,
  },
  valAr1: {
    type: String,
    maxlength: 500,
  },
  valAr2: {
    type: String,
    maxlength: 500,
  },
  valArAF: {
    type: String,
    maxlength: 500,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: [true, "Please provide a userId"],
  },
});
//.pre kaydedilmeden hemen önce yapılacak işlemleri belirlemememize yarar (Pre Hooks)
DictionarySchema.pre("save", function (next) {
  let dateTime = Date.now();
  if (this.createdDate == undefined || this.createdDate == null) {
    this.createdDate = dateTime;
  }
  this.modifiedDate = dateTime;
  next();
});

module.exports = mongoose.model("Dictionary", DictionarySchema);
