const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
// const logger = require("morgan"); //logs HTTP methods


// Configure body parser for AJAX requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve up static assets
app.use(express.static("client/build"));

// Use morgan logger for logging requests
// app.use(logger("dev"));

// Add routes
const routes = require("./routes")
app.use(routes);

//Determine if using local DB or heroku mLabs db
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact"

var db = process.env.MONGODB_URI || "mongodb://localhost/nytreact"
// Set up promises with mongoose
mongoose.Promise = global.Promise;


// //Connect to database
// mongoose.connect(
//   MONGODB_URI
// );

// Connect mongoose to our database
mongoose.connect(db, function(error){
  // log any errors connecting with mongoose
  if (error) {
      console.log(error);
  }
  // or log a success message
  else {
      console.log("mongoose connection is successful");
  }
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on ${PORT}`);
});