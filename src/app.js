const express = require("express");

const app = express();


app.use("/", (req, res) => {
  res.send("Hello");
});


app.use("/chat", (req, res) => {
  res.send("Live chat");
});

app.use("/test", (req, res) => {
  res.send("Test command");
});




app.listen(8080, () => {
    console.log("The port is running on the server 8080...");
});