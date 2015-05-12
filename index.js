var commander = require('commander'),
  discover = require('ganglion-discovery-aws'),
  fs = require('fs'),
  packageJson = require('./package.json');

module.exports = function() {
  var frontendBegin = 'ganglion-frontend-begin',
    frontendEnd = 'ganglion-frontend-end',
    backendsBegin = 'ganglion-backends-begin',
    backendsEnd = 'ganglion-backends-end';

  commander
    .version(packageJson.version)
    .option('-m, --monitor', 'monitor continuously')
    .option('-h, --haproxy [file]', 'update haproxy.cfg file [/etc/haproxy/haproxy.cfg]', '/etc/haproxy/haproxy.cfg')
    .parse(process.argv);

  var microservices = discover();

  //var x = fs.readFileSync('/Users/roylines/tmp/haproxy.cfg').toString();
  //console.log(x);
  //console.log(commander.monitor === true);
};
