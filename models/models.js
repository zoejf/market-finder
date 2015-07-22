var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10), 
  validate = require('mongoose-validator');

  var validateEmail = function(email) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email)
  };


//market schema for test data only
var MarketSchema = new Schema ({
	name: String,
	location: String,
	day: String, 
	hours: String
})

var PostSchema = new Schema ({
  body: String
});

//vendor schema
var	VendorSchema = new Schema ({
	email: {type: String, 
          trim: true, 
          unique: true, 
          required: 'Please enter a valid email address', 
          validate: [validateEmail, 'Please enter a valid email address'],
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
	passwordDigest: String, 
  posts: [PostSchema]
});




// create a new vendor with secure (hashed) password
VendorSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our schema
  // store it in variable `that` because `this` changes context in nested callbacks
  var that = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new vendor (save to db) with hashed password
      that.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate vendor (when they log in)
VendorSchema.statics.authenticate = function (email, password, callback) {
  // find vendor by email entered at log in
  this.findOne({email: email}, function (err, vendor) {
    console.log(vendor);

    // throw error if can't find vendor
    if (vendor === null) {
      throw new Error('Can\'t find vendor with email ' + email);

    // if found vendor, check if password is correct
    } else if (vendor.checkPassword(password)) {
      callback(null, vendor);
    }
  });
};

//when vendor signs in, check if that email address is already taken
//something similar to .authenticate



// compare password vendor enters with hashed password (`passwordDigest`)
VendorSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password vendor enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Market = mongoose.model('Market', MarketSchema);
var Vendor = mongoose.model('Vendor', VendorSchema);
var Post = mongoose.model('Post', PostSchema);

module.exports.Market = Market;
module.exports.Vendor = Vendor;
module.exports.Post = Post;




