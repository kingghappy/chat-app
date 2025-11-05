import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  fullName: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  profilePic: { type: String, default: "" },
});

const User = model('User', userSchema)

export default User