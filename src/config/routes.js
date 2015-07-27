/**
 * Created by Maximilian on 29.04.2015.
 */

var sessionController = require('../controller/sessionCtrl');
var timeController = require('../controller/timeCtrl');

module.exports = function(app) {
    app.use('/session', sessionController);
    app.use('/time', timeController);
};