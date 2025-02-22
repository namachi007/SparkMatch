require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8080;
const {validateSignUp} = require("./utils/validateSignUp");
const bcrypt = require("bcrypt");

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;

  try {
    validateSignUp(req);

    const { firstName, lastName, emailId, password, age, about, gender, skills, photourl } = userObj;

    const passwordHash = await bcrypt.hash( password, 8);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      about,
      gender,
      skills,
      photourl,
    });

    await user.save();
    res.send("The user profile is successfully created");
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Email already existed");
    } else {
      res.status(400).send("Error saving the user: " + err.message);
    }
  }
});

app.post("/login" , async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({emailId: emailId});

    if(!user) {
      throw new Error("Unable to login, Please check your email and password");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword) {
      throw new Error("Unable to login, Please check your email and password");
    }
    res.send("The user is successfully logged in");
  } catch (err) {
    console.log("Something went wrong", err.message);
  }

});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    console.log("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("The user is deleted successfully");
  } catch (err) {
    console.log("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;

  const data = req.body;
  try {
    const Allowed_updates = [
      "firstName",
      "lastName",
      "skills",
      "password",
      "age",
      "about",
      "photoUrl",
    ];

    const updates = Object.keys(data).every((k) => Allowed_updates.includes(k));

    if (!updates) {
      throw new Error("Invalid updates");
    }
    if (data?.skills.length > 20) {
      throw new Error("Skills length should be less than 20");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("The user profile is updated successfuly");
  } catch (err) {
    console.log("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log("Something went wrong");
  }
});

const connectDB = require("./config/database");

connectDB()
  .then(() => {
    console.log("The database is connected successfully...");
    app.listen(port, () => {
      console.log("The port is running on the server 8080...");
    });
  })
  .catch((err) => {
    console.log("The database is not connected", err);
  });
