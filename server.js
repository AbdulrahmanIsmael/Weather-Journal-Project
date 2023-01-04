// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//Require body-parser Package
const bodyParser = require("body-parser");
//Require Cors Package
const cors = require("cors");
const res = require("express/lib/response");

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Get route
app.get("/WeatherData", (req, res) => {
  res.send(projectData);
});

// Post route
app.post("/new", (req, res) => {
  let newEntry = req.body;
  projectData["Weather Data"] = newEntry;
});
