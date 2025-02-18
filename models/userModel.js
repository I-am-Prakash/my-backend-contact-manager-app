const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is mandatory field"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory field"],
      unique: [
        true,
        "Email filed doen't allow duplicates- one user can have unique email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
