/**
 * Created by Maximilian on 25.04.2015.
 */

var express = require('express');
var dbCore = require('./modules/database/core');

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

dbCore.connect(config.db).then(
    function() {
        startUp();
    },
    function(e) {
        console.log('ERROR: ', e);
    }
);