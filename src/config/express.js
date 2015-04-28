/**
 * Created by Maximilian on 29.04.2015.
 */

var config = require('./config').current;

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', config.allowOrigin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length');
        next();
    });

};