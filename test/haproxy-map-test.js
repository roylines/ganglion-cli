var fs = require('fs'),
  map = require('../lib/haproxy/map');

require('chai').should();

describe('haproxy map', function() {
  var discoveries = require('./fixtures/discoveries.json');

  it('should return expected for empty', function(done) {
    map([], function(e, data) {
      data.should.have.property('frontend');
      data.should.have.property('backends');
      data.frontend.should.equal('');
      data.backends.should.equal('');
      return done(e);
    });
  });

  it('should return expected frontend', function(done) {
    map(discoveries, function(e, data) {
      data.should.have.property('frontend');
      var expected = fs.readFileSync('./test/fixtures/expected-frontend.txt').toString();
      data.frontend.should.equal(expected);
      return done(e);
    });
  });

  it('should return expected backends', function(done) {
    map(discoveries, function(e, data) {
      data.should.have.property('backends');
      var expected = fs.readFileSync('./test/fixtures/expected-backends.txt').toString();
      data.backends.should.equal(expected);
      return done(e);
    });
  });

});
