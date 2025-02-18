const mongoose = require("mongoose");

//Schema is like DDL constraints(Table types and constraints) for table

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Kindly Add name to the contact"],
    },
    email: {
      type: String,
      required: [true, "Kindly Add email to the contact"],
    },
    phone: {
      type: String,
      required: [true, "Kindly Add Phone number to the contact"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
