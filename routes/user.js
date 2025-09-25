const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");


router.route("/signup")
.get( userController.signupForm )
.post( userController.signup )


router.route("/login")
.get( userController.loginForm)
.post( saveRedirectUrl,
    passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
}),
    userController.login
)

// for logout 

router.get("/logout" , userController.logout);


module.exports = router;