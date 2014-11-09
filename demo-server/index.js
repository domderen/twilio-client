'use strict';

var cfg = require('./config.json');
var twilio = require('twilio');
var express = require ('express');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/capability/', function (req, res) {
  var capability = new twilio.Capability(cfg.accountSid, cfg.authToken);
  capability.allowClientOutgoing(cfg.applicationSid);
  capability.allowClientIncoming(req.query.clientName);
  var token = capability.generate();
  res.send(token);
});

app.get('/', function (req, res) {
  var resp = new twilio.TwimlResponse();

  resp.dial({
    callerId: cfg.callerId
  }, function(node) {
    if(req.query.PhoneNumber) {
      node.number(req.query.PhoneNumber);
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

  console.log(cfg);

  console.log('Example app listening at http://%s:%s', host, port);
});
