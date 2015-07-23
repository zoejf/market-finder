var request = require('request'),
    expect = require('chai').expect, 
    baseUrl = 'http://localhost:3000', 
    vendor = {email: "testemail", password: "password"};

//static route to home page
describe('GET /', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

//static route to signup page
describe('GET /signup', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/signup', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

//static route to login page
describe('GET /login', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/login', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

//route to profile page
//static route to login page
describe('GET /profile', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/profile', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

//route to logout
describe('GET /logout', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/logout', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

//vendor submits the vendors form
// describe('POST /vendors', function() {
//   it('should return statusCode 200', function(done) {
//     request.post( 'http://localhost:3000/vendors', 
//       {
//         vendor: {
//           vendor[email]: 'test@email.com',
//           vendor[password]: 'password'
//         }
//       },
//       function(error, response, body) {
//         expect(response.statusCode).to.equal(302);
//         done();
//       }
//     );
//   });
// });


