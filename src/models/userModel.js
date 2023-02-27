const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
    },
    lname: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [validator.isEmail, "required valid Email"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)

