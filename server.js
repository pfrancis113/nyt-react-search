const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser for AJAX requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve up static assets
app.use(express.static("client/build"));

// Add routes
const routes = require("./routes")
app.use(routes);

//Determine if using local DB or heroku mLabs db
var db = process.env.MONGODB_URI || "mongodb://localhost/nytreact"
// Set up promises with mongoose
mongoose.Promise = global.Promise;

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