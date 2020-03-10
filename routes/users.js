const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/UserController");
const userController = new UserController();

router.get("/signup/", passport.restrict, userController.signup);
router.get("/signin/", passport.restrict, userController.signin);
router.post("/create/", userController.create);
router.get("/profile", passport.checkAuthentication, userController.profile);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get("/signout", userController.destroySession);

module.exports = router;
