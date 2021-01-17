const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  locations: { type: Array, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  runStart: { type: Date, required: true },
  runStop: { type: Date, required: true },
});

module.exports = mongoose.model("Route", routeSchema);
