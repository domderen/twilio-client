'use strict';

var cfg = require('./config-example.json');
var twilio = require('twilio');
var express = require ('express');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/capability/:clientName', function (req, res) {
  var capability = new twilio.Capability(cfg.accountSid, cfg.authToken);
  capability.allowClientOutgoing(cfg.applicationSid);
  capability.allowClientIncoming(req.params.clientName);
  var token = capability.generate();
  res.send(token);
});

app.get('/', function (req, res) {
  var data = '<Client>someClient</Client>';

  if(req.query.PhoneNumber) {
    data = '<Number>' + req.query.PhoneNumber + '</Number>';
  }

  var response = '<?xml version="1.0" encoding="UTF-8"?> <Response><Dial callerId="' + cfg.callerId + '">' + data + '</Dial></Response>';
  res.send(response);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
