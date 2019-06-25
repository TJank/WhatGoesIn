var User = require("../models/user");
var Meal = require("../models/meal");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkUserProfileOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
           if(err){
               req.flash("error", "User not found");
               res.redirect("back");
           }  else {
               // is the user requesting own profile page
            if(foundUser._id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkMealOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Meal.findById(req.params.id, function(err, foundMeal){
           if(err){
               req.flash("error", "Meal not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundMeal.owner.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;