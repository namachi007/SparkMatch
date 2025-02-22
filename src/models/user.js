const mongoose = require("mongoose");
const { type } = require("os");
const uniqueValidator = require("mongoose-unique-validator");
var validator = require("validator");

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
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not contain 'password'");
        }
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
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
      validate(value) {
        if (value.length > 150) {
          throw new Error("About should be less than 150 characters");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://openclipart.org/image/800px/247320",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 20) {
          throw new Error("Skills should be less than 20");
        }
      },
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
