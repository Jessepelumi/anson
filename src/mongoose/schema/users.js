import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: mongoose.Schema.Types.String,
  phoneNumber: mongoose.Schema.Types.Number,
  skills: mongoose.Schema.Types.Array,
  nationality: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
