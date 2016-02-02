/**
 * Created by Maximilian on 29.04.2015.
 */

/** ====== IMPORT ====== **/
var q = require('q');
var MapFactory = require('../map/Map');
var sessionCache = require('../util/ObjectCache').construct();

var dbClient = require('../database/client');

/** ====== EXPORT ====== **/
module.exports = {
    find : find,
    findByID: findByID,
    insertNewSession : insert
};

/** ====== PACKAGE ====== **/

/**
 * name of the session collection
 * @constant
 * @type {String}
 */
var collectionName = 'Sessions';

/**
 * find sessions by providing the search criteria
 * @param {Object} criteria
 * @returns {Promise<Session>}
 */
function find(criteria) {
    return dbClient.find(collectionName, criteria).then(
        function(results) {
            var parsedResults = [];
            if(Array.isArray(results)) {
                results.forEach(function(rawObject) {
                    var constructedSession = SessionFactory(rawObject);
                    sessionCache.addToCache(constructedSession.getID(), constructedSession);
                    parsedResults.push(constructedSession);
                })
            }

            return parsedResults;
        }
    );
}

/**
 * find Session Object by id
 * @param {String} sessionID
 * @returns {Promise<Session>}
 */
function findByID(sessionID) {
    var cacheSession = sessionCache.getFromCache(sessionID);
    if (cacheSession) {
        return q(cacheSession);
    }

    return find({_id: sessionID}).then(function(foundSessions) {
        console.log(foundSessions);
        return foundSessions[0];
    });
}

/**
 * insert a new Session Object by raw Session Object
 * @param {Object} rawSessionObject
 * @returns {Promise<Session>}
 */
function insert(rawSessionObject) {
    var newSession = SessionFactory(rawSessionObject);
    return newSession.save();
}

/**
 @class Session
 @type {Object}
 @property {function(): String} getID
 @property {function() : Map} getMap
 @property {function(): Promise<Session>} save
 @property {function(): Object} serialize
 */

/**
 *
 * @param {Object} specs
 * @returns {Session}
 * @constructor
 */
function SessionFactory(specs) {
    var id = null;
    if ('_id' in specs) {
        id = specs._id;
    }

    var topic = null;
    if ('topic' in specs) {
        topic = specs.topic;
    }

    var description = null;
    if ('description' in specs) {
        description = specs.description;
    }

    var startingTime = null;
    if ('startingTime' in specs) {
        startingTime = specs.startingTime;
    }

    var duration = null;
    if ('startingTime' in specs) {
        duration = specs.duration;
    }

    var mapSpecs = {title : topic};

    if ('map' in specs) {
        mapSpecs = specs.map;
    }

    var map = MapFactory.construct(mapSpecs);

    var isSaving = false;
    var isDirty = false;

    return {
        /**
         * get id of object
         * @returns {String} id
         */
        getID: function () {
            return id;
        },

        /**
         *
         * @returns {Map}
         */
        getMap: function() {
            return map;
        },

        /**
         * get serialized version of this session
         * @returns {{_id: *, topic: *, description: *, startingTime: *, duration: *, map: Object}}
         */
        serialize: function() {
            return {
                _id : id,
                topic : topic,
                description : description,
                startingTime : startingTime,
                duration : duration,
                map : map.serialize()
            }
        },

        /**
         * save session to database
         * @returns {Promise}
         */
        save: function() {
            if (isSaving) {
                isDirty = true;
                return isSaving;
            }
            isDirty = false;
            return isSaving = dbClient.upsert(collectionName, this.serialize()).then(function(result) {
                if ('_id' in result) {
                    id = result._id;
                }

                isSaving = false;
                if (isDirty) {
                    this.save();
                }
                return this;
            }.bind(this));
        }
    }
}