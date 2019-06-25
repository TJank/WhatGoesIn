var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Meal = require("../models/meal");
var middleware = require("../middleware");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/what_goes_in3";

// Load User's Home Page
router.get("/:id", middleware.isLoggedIn, function(req, res){
    // console.log(req.user);
    
    // Get all campgrounds from DB
    // console.log(req.user._id);
    // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     dbo.collection("meals").find({owner: {id: req.user._id}}, function(err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         db.close();
    //     });
    // }); 

    Meal.find({owner: {id: req.user._id}}, function(err, allMeals){
        if(err){
            console.log(err);
        } else {
            // res.render("user/index", {currentUser: req.user});
            // DO NOT NEED ^^^ because we defined currentUser as a global value
            console.log(allMeals);
            res.render("user/index",{meals:allMeals});
        }
    });
});


// EDIT User Profile ROUTE
router.get("/:id/profile", middleware.checkUserProfileOwnership, function(req, res){
    // console.log(req.user);
    
    // Get all campgrounds from DB
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            // console.log(foundUser);
            res.render("user/profile", {user: foundUser});
        }
    });
});

// UPDATE User ROUTE
router.put("/:id/profile", middleware.checkUserProfileOwnership, function(req, res){
    // find and update the correct campground
    User.findByIdAndUpdate(req.params.id, req.body.usr, function(err, updatedUser){
       if(err){
           res.redirect("/user/" + req.params.id);
       } else {
           //redirect somewhere(show page)
           res.redirect("/user/" + req.params.id + "/profile");
       }
    });
});





module.exports = router;