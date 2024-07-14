import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  phoneNumber: String,
  skills: { type: [String] },
  nationality: String,
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
