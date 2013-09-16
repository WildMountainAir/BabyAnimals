//dependencies 
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var config = require('./config/config');

var app = express();

//models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

//express
require('./config/express')(app, config);

//routes
require('./config/routes').routeHandler(app);

//database
require('./config/db')(app, config);

//start app
app.listen(config.port);

module.exports = app;
var db = require('./config/db');
module.exports.db = db;