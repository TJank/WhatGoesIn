var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Meal = require("../models/meal");
var middleware = require("../middleware");


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("meals/new");
});

//CREATE - add new meal to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var d = new Date();
    console.log(d);
    
    // get data from form and add to campgrounds array
    var type = req.body.type;
    var title = req.body.title;
    var calories = req.body.calories;
    var carbs = req.body.carbs;
    var fats = req.body.fats;
    var protein = req.body.protein;
    var sugar = req.body.sugar;
    var sodium = req.body.sodium;
    var date = d;
    var owner = {
        id: req.user._id,
        username: req.user.username
    }
    var newMeal = {title: title, type: type, calories: calories, carbs: carbs, fats: fats, protein: protein, sugar: sugar, sodium: sodium, date: d, owner: owner};
    // Create a new campground and save to DB
    console.log(newMeal);
    Meal.create(newMeal, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            res.redirect("/user/" + req.user._id);
        }
    });
});


// EDIT Meal ROUTE
router.get("/:id/edit", middleware.checkMealOwnership, function(req, res){
    Meal.findById(req.params.id, function(err, foundMeal){
        if(err){
            console.log(err);
            req.redirect("back");
        } else{
            res.render("meals/edit", {meal: foundMeal});
        }
    });
});



module.exports = router;