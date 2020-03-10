const Post = require("../models/posts");

class HomeController {
  home(request, response) {
    Post.find({})
      .populate("user")
      .exec(function(error, post) {
        if (error) {
          console.log("Error while fetching post");
        }
        return response.render("home", {
          title: "Codeial",
          posts: post
        });
      });
  }

  createPost(request, response) {
    Post.create(
      {
        content: request.body.content,
        user: request.user._id
      },
      function(error, new_post) {
        if (error) {
          console.log("Error in creating posts");
        }
        console.log(new_post);
        return response.redirect("back");
      }
    );
  }
}

module.exports = HomeController;
