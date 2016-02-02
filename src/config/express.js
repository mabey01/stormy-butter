/**
 * Created by Maximilian on 29.04.2015.
 */

var config = require('./config').current;
var formidable = require('formidable');

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', config.allowOrigin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length');
        next();
    });

    app.use(function(req, res, next) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            req.form = {
                fields : fields,
                files : files
            };
            next();
        });
    })
};