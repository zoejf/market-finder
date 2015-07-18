// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

  var markets = [
    	{name: "Inner Richmond", 
    	location: "Clement St", 
    	day: "Sunday", 
    	hours: "7am - 2pm" }, 
    	{name: "Ferry Building",
    	 location: "Embarcadero", 
    	 day: "Wednesday", 
    	 hours: "12pm - 4pm"}, 
    	 {name: "Heart of the City",
    	  location: "UN Plaza", 
    	  day: "Wednesday", 
    	  hours: "7:30am - 5:30pm"}
    ]
//STATIC ROUTES
// root route to get to main page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//API ROUTES

app.get('/api/markets', function (req, res) {
	res.json(markets);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});