const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/social");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to database using mongoose");
});
