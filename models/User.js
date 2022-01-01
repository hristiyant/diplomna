const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for friend requests
const FriendRequestSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    type: [Schema.Types.ObjectId],
    ref: "users",
    default: []
  },
  friendRequests: {
    type: [FriendRequestSchema],
    default: []
  },
  imageUrl: {
    type: String
  }
});

module.exports = {
  userSchema: UserSchema,
  userModel: mongoose.model("users", UserSchema)
}