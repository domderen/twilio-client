'use strict';

var fs = require('fs');
var nconf = require('nconf');
var twilio = require('twilio');
var express = require ('express');

var configFilePath = __dirname + '/config.json';

console.log('config file path: ' + configFilePath);

nconf.argv()
  .env()
  .file({ file: configFilePath });

nconf.use('file', { file: configFilePath });
nconf.load();

console.log('accountSid: ' + nconf.get('accountSid'));
console.log('authToken: ' + nconf.get('authToken'));
console.log('applicationSid: ' + nconf.get('applicationSid'));
console.log('callerId: ' + nconf.get('callerId'));

nconf.set('accountSid', nconf.get('accountSid'));
nconf.set('authToken', nconf.get('authToken'));
nconf.set('applicationSid', nconf.get('applicationSid'));
nconf.set('callerId', nconf.get('callerId'));

nconf.save(function (err) {
  if(err) {
    console.log(err);
  } else {
    fs.readFile(configFilePath, function (err, data) {
      console.log('Config file contents:');
      console.dir(JSON.parse(data.toString()))
    });
  }
});

var app = express();

app.use('/demo' + '/**/demo-server', function (req, res, next) {
  res.status(403);
  res.send('<h1>403 Forbidden</h1>');
});

app.use('/demo', express.static(__dirname + '/../../'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/capability/', function (req, res) {
  var capability = new twilio.Capability(nconf.get('accountSid'), nconf.get('authToken'));
  capability.allowClientOutgoing(nconf.get('applicationSid'));
  capability.allowClientIncoming(req.query.clientName);
  var token = capability.generate();
  res.send(token);
});

app.get('/', function (req, res) {
  var resp = new twilio.TwimlResponse();

  resp.dial({
    callerId: nconf.get('callerId')
  }, function(node) {
    if(req.query.PhoneNumber) {
      node.number(req.query.PhoneNumber);
    } else if(req.query.ClientName) {
      node.client(req.query.ClientName);
    } else {
      node.client('someClient');
    }
  });

  res.set('Content-Type', 'text/xml');
  res.send(resp.toString());
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
