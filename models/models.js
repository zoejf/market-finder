var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var marketSchema = new Schema ({
	name: String,
	location: String,
	day: String, 
	hours: String
})

// var	vendorSchema = new Schema ({
// 	name
// })

var Market = mongoose.model('Market', marketSchema);

module.exports.Market = Market;