var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var MealSchema = new mongoose.Schema({
    title: String,
    type: String,
    calories: Number,
    carbs: Number,
    fats: Number,
    protein: Number,
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    date: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {
    versionKey: false
});

MealSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Meal", MealSchema);