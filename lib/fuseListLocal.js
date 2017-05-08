var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require("fs");

function fuseListLocalRoute() {
  var fuseListLocal = new express.Router();
  fuseListLocal.use(cors());
  fuseListLocal.use(bodyParser());

  fuseListLocal.get('/', function(req, res) {
    var content = fs.readFileSync(__dirname + "/OpportunityList.txt","utf8");
    res.json(content);
  });

  return fuseListLocal;
}

module.exports = fuseListLocalRoute;
