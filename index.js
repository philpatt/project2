// define all requires/modules/packages
require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isloggedin');
var passport = require('./config/passportConfig');
var session = require('express-session');
var app = express ();

//define middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use(session({
	secret: 'abc123',
	resave: false,
	saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

app.get('/', function(req,res){
	res.render('home');
	//add suggested parks 
});

//define controllers
// localhost:3000/search

// app.use('/prof', require('./controllers/profile'));
app.use('/show', require('./controllers/show'));
app.use('/search', require('./controllers/search'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/auth', require('./controllers/auth'));







app.listen(process.env.PORT || 3000);














