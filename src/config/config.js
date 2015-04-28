/**
 * Created by Maximilian on 29.04.2015.
 */

var path = require('path'),
    pkgJSON = require('../../package.json'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.ENVIRONMENT || 'local';

var config = {
    local: {
        root: rootPath,
        app: pkgJSON,
        port: 4444,
        db: 'mongodb://localhost:27017/stormyButter_local',
        allowOrigin : '*'
    },

    production: {
        root: rootPath,
        app: pkgJSON,
        port: 4444,
        db: 'mongodb://localhost:27017/stormyButter',
        allowOrigin : '*'
    }
};

module.exports.current = config[env];
module.exports.all = config;