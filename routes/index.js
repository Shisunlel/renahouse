const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

//index
router.get('/', (req, res)=>{
    res.render('index');
  });
  
  //LOGIN ROUTE
  
  //registration form
  router.get("/register", (req, res) => {
    res.render("register");
  });
  
  //SIGN UP LOGIC
  router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        req.flash("error", err.message);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to Rentahouse, " + user.username);
        res.redirect("/house");
      });
    });
  });
  
  //LOGIN FORM
  router.get("/login", (req, res) => {
    res.render("login");
  });
  
  //LOGIN LOGIC
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/house",
      failureRedirect: "/login",
    }),
    (req, res) => {}
  );
  
  //LOGOUT
  router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("back");
  });

  module.exports = router;