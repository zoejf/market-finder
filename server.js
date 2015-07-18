// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// set up root route to respond with 'hello world'
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});