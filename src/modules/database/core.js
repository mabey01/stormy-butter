/**
 * Created by Maximilian on 29.04.2015.
 */

/** IMPORT **/
var q = require('q');
var MongoClient = require('mongodb').MongoClient;

/** EXPORT **/
module.exports = {
    connect : connect,
    getDB : getDB,
    getCollection : getCollection
};

/** PACKAGE **/
var DB = null;

/**
 * get MongoDB object
 * @returns {Object}
 */
function getDB() {
    return DB;
}

/**
 * get a collection from a MongoDB by collectionName
 * @param {String} collectionName
 * @returns {Promise.<Object>}
 */
function getCollection(collectionName) {
    var deferred = q.defer();
    if (DB) {
        var collection = DB.collection(collectionName);
        deferred.resolve(collection);
    } else {
        deferred.reject('DB is not connected')
    }
    return deferred.promise;
}

/**
 * connect to a MongoDB
 * @param {String} url
 * @returns {Promise.<Object>}
 */
function connect(url) {
    if (!url) return q.reject('parameter url is not set');
    if (typeof url != 'string') return q.reject('parameter url is not a string');

    var deferred = q.defer();
    if (DB) deferred.resolve(DB);
    else {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                return deferred.reject();
            }
            else {
                DB = db;
                return deferred.resolve(DB);
            }
        });

    }
    return deferred.promise;
}