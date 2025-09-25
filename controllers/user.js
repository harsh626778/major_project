const User = require("../models/user.js");
const passport = require("passport");

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    // Signup ke baad direct login kar dena
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      console.log("User logged in via req.login:", req.user);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = 
  async(req, res) => {
    console.log("Logged in user:", req.user);
    req.flash("success", "Welcome to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

module.exports.logout = (req, res, next) => {
  const loggedInUser = req.user; // logout se pehle ka user store kar lo
  console.log("User who is logging out:", loggedInUser);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("After logout, user is:", req.user);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};

