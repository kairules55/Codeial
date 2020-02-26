const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const userController = new UserController();

router.get("/signup/", userController.signup);
router.get("/signin/", userController.signin);
router.post("/create/", userController.create);

module.exports = router;
