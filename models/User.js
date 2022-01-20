import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Model for invitations
const InvitationSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
})

// Model for users
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
  phone: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "users",
    default: []
  },
  invitations: {
    type: [InvitationSchema],
    default: []
  },
});

const User = mongoose.model("users", UserSchema);

export default User;