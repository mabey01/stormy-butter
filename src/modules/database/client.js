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
    find : findObject
};

/** PACKAGE **/

/**
 *
 * @param {String} collectionName
 * @param {Object} object
 * @returns {Promise}
 */
function insertObject(collectionName, object) {
    return dbCore.getCollection(collectionName)
        .then(function(collection) {
            var deferred = q.defer();

            collection.insert(object, function(err, result) {
                if(err) return deferred.reject(err);

                if ('_id' in result) {
                    object._id = result._id;
                }

                deferred.resolve(object);
            });

            return deferred.promise;
        });
}


/**
 *
 * @param collectionName
 * @param criteria
 * @returns {Promise}
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
};