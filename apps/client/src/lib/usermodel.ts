// models/userModel.ts

import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    role: String,
    email: String,
    salt: String,
    hash: String,
    _verified: Boolean,
    _verificationToken: String,
    loginAttempts: Number,
    createdAt: Date,
    updatedAt: Date,
    lockUntil: Date,
  })
);

export default User;
