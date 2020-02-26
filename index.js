const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;

const db = require("./config/mongoose");
const app = express();

//MiddleWare
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("assets"));
app.use("/", require("./routes"));

//Setup View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function(error) {
  if (error) {
    console.log("Error while starting the server");
    return;
  }
  console.log("Server is up and running", port);
});
