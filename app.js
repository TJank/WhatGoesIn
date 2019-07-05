var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
	mysql		= require("mysql"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    seedDB      = require("./seeds"),
    User        = require("./models/user");

// Handling mongoose errors:
// mongoose.set('useFindAndModify', false);
// set up mongodb connection
// mongoose.connect("mongodb+srv://<username>:<password>-goes-in-ckwdq.mongodb.net/test?retryWrites=true&w=majority");
// var url = process.env.DATABASEURL || "mongodb+srv://<username>:<password>-goes-in-ckwdq.mongodb.net/test?retryWrites=true&w=majority"; 
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log("Connected to DB! ");
// }).catch(err => {
//     console.log("ERROR:", err.message);
// });

var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'user',
	password	: 'password',
	database	: 'database'
});
// seedDB();

//requiring routes
var indexRoutes = require("./routes/index"),
    mealRoutes = require("./routes/meal"),
    userRoutes = require("./routes/user");

// configure app - app.use()
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "We support health and wellness!",
    resave: false,
    saveUninitialized: false
}));

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/meals", mealRoutes);

app.listen(3000, function(){
   console.log("WhatGoesIn has started up... listening on port: 3000");
});