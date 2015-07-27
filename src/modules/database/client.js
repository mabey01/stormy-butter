/**
 * Created by Maximilian on 29.04.2015.
 */

/** IMPORT **/
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var dbCore = require('./core');

/** EXPORT **/
module.exports = {
    insert : insertObject,
    upsert : upsertObject,
    find : findObject
};

/** PACKAGE **/

/**
 * insert an object into database collection
 * @param {String} collectionName
 * @param {Object} object
 * @returns {Promise.<Object>}
 */
function insertObject(collectionName, object) {
    return dbCore.getCollection(collectionName)
        .then(function(collection) {
            var deferred = q.defer();

            collection.insert(object, function(err, result) {
                if(err) return deferred.reject(err);
                var savedObject = result.ops[0];
                deferred.resolve(savedObject);
            });


            return deferred.promise;
        });
}

/**
 * inserts an object if not in database, updates object if already in database
 * @param {String} collectionName
 * @param {Object} object
 * @returns {Promise.<Object>}
 */
function upsertObject(collectionName, object) {
    return dbCore.getCollection(collectionName)
        .then(function(collection) {
            var deferred = q.defer();

            collection.save(object, function(err, result) {
                if(err) return deferred.reject(err);

                var savedObject = null;
                if ('ops' in result) {
                    savedObject = result.ops[0];
                } else {
                    savedObject = result;
                }
                deferred.resolve(savedObject);
            });


            return deferred.promise;
        });
}


/**
 * find an object in database collection by providing search criteria
 * @param {String} collectionName
 * @param {Object} criteria
 * @returns {Promise.<Object>}
 */
function findObject(collectionName, criteria) {
    return dbCore.getCollection(collectionName)
        .then(function(collection) {
            if ('_id' in criteria) {
                criteria._id = ObjectId.createFromHexString(criteria._id.toString());
            }

            var deferred = q.defer();
            collection.find(criteria).toArray(function(err, results) {
                if (err) return deferred.reject(err);
                deferred.resolve(results);
            });

            return deferred.promise;
        }
    );
}