/**
 * Created by Maximilian on 25.04.2015.
 */

var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config/config').current;
var expressConfig = require('./config/express');
var routes = require('./config/routes');

var startUp = function() {
    var app = express();

    expressConfig(app);
    routes(app);


    var server = app.listen(config.port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
};

MongoClient.connect(config.db, function(err, db) {
    console.log("Connected correctly to server");
    startUp();
});