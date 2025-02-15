require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8080;

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;

  const user = new User(userObj);

  try {
    await user.save();
    res.send("The user profile is successfully created");
  } catch (err) {
    res.status(400).send("Error saving the user: ", err);
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

// const {adminAuth} = require("./middlewares/auth");

// app.use("/user", adminAuth);

// app.get("/user/:userId", (req, res) => {
//   const userId = req.params.userId;
//   res.send(`fetching user with ID : ${userId}`);
// });

// app.post("/user", (req, res) => {
//   res.send("User profile is successfully updated!");
// });

// app.delete("/user", (req, res) => {
//   res.send("User profile is deleted");
// });
