const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for friend requests
const FriendRequestSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  fromUserID: {
    type: String,
    required: true
  },
  fromUserName: {
    type: String,
    required: true
  }
})

// DB model for user entries
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
    type: Array,
    default: []
  },
  friendRequests: {
    type: [FriendRequestSchema],
    default: [] // was undefined!!!
  },
  imageUrl: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);