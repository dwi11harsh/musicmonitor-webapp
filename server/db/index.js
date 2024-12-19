const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  User,
  Admin,
};
