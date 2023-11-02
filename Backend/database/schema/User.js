import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  mapList: {
    type: [Number], // This assumes that mapList is an array of numbers.
    required: false,
    unique: false,
  },
  userType: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
  // email authentication
  verificationCode: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const UserModel = model("User", UserSchema);
export default UserModel;
