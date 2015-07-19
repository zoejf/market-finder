var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var marketSchema = new Schema ({
	name: String,
	location: String,
	day: String, 
	hours: String
})

var Market = mongoose.model('Market', marketSchema);

module.exports.Market = Market;