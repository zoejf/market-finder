// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    mongoose = require("mongoose"),
	mongoose.connect("mongodb://localhost/market-finder"),
	_ = require("underscore");


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

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
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});