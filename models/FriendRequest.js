const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// DB model for user entries
const FriendRequestSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
});

module.exports = User = mongoose.model("users", UserSchema);