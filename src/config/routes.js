/**
 * Created by Maximilian on 29.04.2015.
 */

var sessionController = require('../controller/sessionCtrl');

module.exports = function(app) {

    app.use('/session', sessionController);

};