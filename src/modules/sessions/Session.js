/**
 * Created by Maximilian on 29.04.2015.
 */

/** ====== IMPORT ====== **/
var q = require('q');

var dbClient = require('../database/client');

/** ====== EXPORT ====== **/
module.exports = {
    find : findSession,

    construct : function(specs) {
        if (!specs) throw new Error("no specs provided to create new Session");
        return new Session(specs);
    },

    constructed : function(object) {
        return object instanceof Session;
    }
};

/** ====== PACKAGE ====== **/

/**
 * name of the session collection
 * @type {String}
 */
var collectionName = 'Sessions';

/**
 * find sessions by providing the search criteria
 * @param {?Object} criteria
 * @returns {Promise}
 */
function findSession(criteria) {
    return dbClient.find(collectionName, criteria).then(
        function(results) {
            var parsedResults = [];
            if(Array.isArray(results)) {
                results.forEach(function(rawObject) {
                    parsedResults.push(new Session(rawObject))
                })
            }

            return parsedResults;
        }
    );
}

/**
 *
 * @param {Object} specs
 * @implements Storable
 * @constructor
 */
function Session(specs) {
    this._addAttribute('id', specs);
    this._addAttribute('topic', specs);
    this._addAttribute('description', specs);
    this._addAttribute('startingTime', specs);
    this._addAttribute('duration', specs);
}

/**
 *
 * @param {!String} attributeName
 * @param {!Object} specs
 * @param {Function=} parseValue
 * @private
 */
Session.prototype._addAttribute = function(attributeName, specs, parseValue) {
    if (typeof attributeName != 'string') return;
    if (typeof specs != 'object') return;

    var attributeValue = null;
    if (attributeName in specs) {
        attributeValue = specs[attributeName];
    } else if ('_' + attributeName in specs) {
        attributeValue = specs['_' + attributeName]
    }

    if (attributeName[0] != '_') attributeName = '_' + attributeName;
    if (typeof parseValue === 'function') attributeValue = parseValue(attributeValue);

    this[attributeName] = attributeValue;
};

Session.prototype.save = function () {
    return dbClient.insert(collectionName, this);
};