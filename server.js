// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    mongoose = require("mongoose"),
	_ = require("underscore"),
	session = require('express-session');

	mongoose.connect(
	  process.env.MONGOLAB_URI ||
	  process.env.MONGOHQ_URL ||
	  'mongodb://localhost/market-finder' // plug in the db name you've been using
	);

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// middleware to set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));


  var markets = [
    	{_id: "55aae016d0f5a164a679f617", name: "Inner Richmond", address: "Clement St", day: "Sunday", hours: "7am - 2pm", Products: "veggies, meat, eggs, cheese", numVendors: 70}, 
    	{_id: "55aae058d0f5a164a679f618", name: "Ferry Building", address: "Embarcadero", day: "Wednesday", hours: "12pm - 4pm", Products: "veggies, fruit, bread, cheese", numVendors: 30} 
    ];

 // connect to models
 var db = require('./models/models');

//STATIC ROUTES
// root route to get to main page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//signup route with placeholder response
app.get('/signup', function (req,res) {
	res.send('coming soon');
});

// vendor submits the signup form
app.post('/vendors', function (req, res) {

  // grab vendor data from params (req.body)
  var newVendor = req.body.vendor;

  // create new vendor with secure password
  db.Vendor.createSecure(newVendor.email, newVendor.password, function (err, vendor) {
    res.send(vendor);
  });
});

// vendor submits the login form
app.post('/login', function (req, res) {

  // grab vendor data from params (req.body)
  var vendorData = req.body.vendor;

  // call authenticate function to check if password vendor entered is correct
  db.Vendor.authenticate(vendorData.email, vendorData.password, function (err, vendor) {
    res.send(vendor);
  });
});

//API ROUTES

app.get('/api/markets', function (req, res) {
	db.Market.find(function (err, markets) {
		if(err) {
			console.log("error: ", err);
			res.status(500).send(err);
		} else {
			// console.log(markets);
			res.json(markets);
		}
		
	});
})

app.put('/api/markets/:marketId', function (req, res) {
	//set the value of the id from the request
	var targetId = req.params.marketId;
	// console.log('targetId: ' + targetId);
	//find item in markets array matching the id
	var foundMarket = _.findWhere(markets, {_id: targetId});
	// console.log('foundMarket: ' + foundMarket);

	res.json(foundMarket);
})

// listen on port 3000
app.listen(process.env.PORT || 3000);