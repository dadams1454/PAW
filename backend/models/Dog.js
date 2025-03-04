const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  microchip: { type: String, unique: true },
  healthRecords: [{ date: String, details: String }],
});

module.exports = mongoose.model("Dog", DogSchema);
