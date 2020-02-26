const User = require("../models/user");

class UserController {
  signup(request, response) {
    response.render("signup");
  }

  signin(request, response) {
    response.render("signin");
  }

  create(request, response) {
    if (request.body.password != request.body.confirm_password) {
      return response.redirect("back");
    }

    User.findOne({ email: request.body.email }, function(error, user) {
      if (error) {
        console.log("Error in finding the user");
      }
      if (!user) {
        User.create(request.body, function(error, new_user) {
          if (error) {
            console.log("Error in creating the user");
          }
          return response.redirect("signin");
        });
      }
      return response.redirect("back");
    });
  }
}

module.exports = UserController;
