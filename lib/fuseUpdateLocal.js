var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require("fs");

function fuseUpdateLocalRoute() {
  var fuseUpdateLocal = new express.Router();
  fuseUpdateLocal.use(cors());
  fuseUpdateLocal.use(bodyParser());

  fuseUpdateLocal.get('/', function(req, res) {
    var optId = req.query.optId;
    res.json({msg: 'Opportunity: ' + optId + ' has been successfully closed.'});
  });

  return fuseUpdateLocal;
}

module.exports = fuseUpdateLocalRoute;
