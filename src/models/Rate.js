const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const toJson = require("meanie-mongoose-to-json");
const Schema = mongoose.Schema;

// Create Schema
const RateSchema = new Schema({
  currencyName: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Apply meanie plugin to change the attributes i.e. {_d, v}
RateSchema.plugin(toJson);


// Apply the uniqueValidator plugin to the Schema.
RateSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

// Exports
module.exports = Project = mongoose.model("rate", RateSchema);
