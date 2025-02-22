const mongoose = require("mongoose");
const { type } = require("os");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxlength: 30,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "Default about",
    },
    photoUrl: {
      type: String,
      default: "https://openclipart.org/image/800px/247320",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
