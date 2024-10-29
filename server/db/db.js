// Accessing MongoDB Packages
const mongoose = require("mongoose");

// Importing env file
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;

// Connecting MongoDB DataBase
const mongoDB = async () => {
  try {
    console.log("Trying to Connect to MongoDB.");
    await mongoose.connect(`${mongoURI}/datanexify`);
    console.log("MongoDB Connected.");
  } catch (error) {
    console.error("err:", error.message);
  }
};

module.exports = mongoDB;