var validator = require("validator");

const validateSignUp = (req) => {
  const userObj = req.body;
  const {
     firstName,
     lastName,
     emailId,
     password,
     age,
     about,
     gender,
     skills,
     photourl,
   } = userObj;

  if (!firstName || !emailId || !password) {
    throw new Error("All input is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
  else if (age < 18) {
    throw new Error("Age should be greater than 18");
  } 
  else if (!["male", "female", "others", "other"].includes(gender)) {
    throw new Error("Invalid gender data");
  }
  else if (skills?.length > 20) {
    throw new Error("Skills length should be less than 20");
  }
  else if (about?.length > 150) {
    throw new Error("About length should be less than 150");
  }
  else if (photourl && !validator.isURL(photourl)) {
    throw new Error("Photo URL is not valid");
  }

};

module.exports = { validateSignUp };
