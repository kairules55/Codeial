const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;

const db = require("./config/mongoose");
const app = express();

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");

//MiddleWare

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("assets"));

//Setup View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    secret: "someKeyToEncrypt",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100 * 60 * 100
    },
    store: new MongoStore(
      {
        mongooseConnection: mongoose.connection,
        autoRemove: "disabled"
      },
      function(error) {
        console.log(error);
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(expressLayout);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));

app.listen(port, function(error) {
  if (error) {
    console.log("Error while starting the server");
    return;
  }
  console.log("Server is up and running", port);
});
