var request = require('request'),
    expect = require('chai').expect, 
    User = require('../server.js');


describe('Google.com', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('https://google.com/', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
        console.log("err: " + err + " res: " + res + " body: " + body)
       done();
    })
  })
});


});