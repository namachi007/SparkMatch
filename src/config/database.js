const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.error("The database is not connected", err);
    process.exit(1);
  }
};

module.exports = connectDB;
