var mysql = require("mysql");
var User = require("./models/user");
var Meal   = require("./models/meal");

var data = [
    {
        title: "Bean Chili",
        type: "Lunch",
        calories: 500,
        carbs: 26,
        fats: 6,
        protein: 28
    }
]

function seedDB(){
   //Remove all campgrounds
   Meal.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed meals!");
         //add a few campgrounds
        data.forEach(function(seed){
            Meal.create(seed, function(err, meal){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a meal");
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
