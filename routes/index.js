var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// about route
router.get("/about", function(req, res){
    res.render("about");
});

// contact route
router.get("/contact", function(req, res){
    res.render("contact");
});

// creaters route?

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// handle register logic
router.post("/register", function(req, res){
    // console.log(req.body.email + " " + req.body.firstName + " " + req.body.lastName);
    var newUser = new User({username: req.body.username, email: req.body.email, name: req.body.name, age: req.body.age, height: req.body.height, weight: req.body.weight});
    // console.log(newUser);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            // console.log(user);
            req.flash("success", "Welcome to WhatGoesIn! " + user.username);
            res.redirect("/user/" + req.user._id); 
        });
    });
});


// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// handle login logic
router.post("/login", passport.authenticate("local"), function(req, res){
    res.redirect("/user/" + req.user._id);
});

// logout logic
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});



module.exports = router;