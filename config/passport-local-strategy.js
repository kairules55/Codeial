const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //find the user and establish the identity
      User.findOne({ email: email }, function(error, user) {
        if (error) {
          console.log("Error in findign user --> Passport");
          return done(error);
        }

        if (!user || password != user.password) {
          console.log("Invalid username or password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//Serialize the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(error, user) {
    if (error) {
      console.log("Error in finding the user --> Passport");
      return done(error);
    }
    if (!user) {
      console.log("Invalid User");
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.redirect("/users/signin");
};

passport.restrict = function(request,response,next){
  if(request.isAuthenticated()){
    return response.redirect("back");
  }
  return next();
}

passport.setAuthenticatedUser = function(request, response, next) {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
  }
  return next();
};

module.exports = passport;
