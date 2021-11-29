const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  friends: {
    // TODO: Add functinality to store users, who are friends in an array,
    type: Array,
    default: []
},
});
module.exports = User = mongoose.model("users", UserSchema);