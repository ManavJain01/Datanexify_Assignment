// Importing Routes
const routes = require("./routes/route");

// Importing env file
require("dotenv").config();

// Accessing Express Packages
const express = require("express");
const app = express();

// Importing cors and using it.
const cors = require("cors");
app.use(
  cors({
    origin: [process.env.ClientLocation],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// Importing Database
const mongoDB = require("./db/db");

// Set router
app.use("/", routes);

// Connecting MongoDB Server
mongoDB();

// Starting the server
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});