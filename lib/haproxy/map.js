var _ = require('lodash');

function mapFrontend(discoveries) {
  return _.map(discoveries, function(discovery) {
    return '  acl url-' +
      discovery.name +
      ' path_beg ' +
      discovery.endpoint +
      '\n' +
      '  use_backend ' +
      discovery.name +
      ' if url-' +
      discovery.name +
      '\n';
  }).join('\n');
}

function mapBackends(discoveries) {
  return _.map(discoveries, function(discovery) {
    return '\nbackend ' + discovery.name + '\n' +
      '  mode http\n' +
      '  balance roundrobin\n\n' +
      _.map(discovery.addresses, function(address, i) {
        return '  server ' + discovery.name + '-' + i + ' ' +
          address + ' check\n';
      }).join('');
  }).join('');
}

module.exports = function(discoveries, done) {
  var data = {
    frontend: mapFrontend(discoveries),
    backends: mapBackends(discoveries)
  };

  return done(null, data);
};
