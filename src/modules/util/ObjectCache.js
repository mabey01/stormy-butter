/**
 * Created by Maximilian on 27.07.2015.
 */

/** ====== IMPORT ====== **/

/** ====== EXPORT ====== **/
module.exports = {

    /**
     *
     * @returns {Cache}
     */
    construct : function(timeLimit) {
        return ObjectCacheFactory(timeLimit);
    }
};

/** ====== PACKAGE ====== **/

/**
 @class Cache
 @type {Object}
 @property {function(String)} removeFromCache
 @property {function(String, Object)} addToCache
 @property {function(String): Object} getFromCache
 */

/**
 * @returns {Cache}
 * @constructor
 */
function ObjectCacheFactory(timeLimit) {
    var MAX_TIMEOUT_CACHE = timeLimit || 30000;
    var cache = {};

    return {

        /**
         * remove object from cache with id
         * @param {String} id
         */
        removeFromCache : function(id) {
            if (id in cache) {
                var cacheObj = cache[id];
                if ('timeout' in cacheObj) {
                    clearTimeout(cache[id].timeout);
                }

                delete cache[id];
            }
        },

        /**
         * add object to cache with id
         * @param {String} id
         * @param {Object} object
         */
        addToCache : function(id, object) {
            cache[id] = {
                timeout : setTimeout(this.removeFromCache.bind(this, id), MAX_TIMEOUT_CACHE),
                object: object
            };
        },

        /**
         * get object from cache with id
         * @param {String} id
         * @returns {Object}
         */
        getFromCache : function(id) {
            if (id in cache) {
                var chacheObj = cache[id];
                clearTimeout(chacheObj.timeout);
                chacheObj.timeout = setTimeout(this.removeFromCache.bind(this, id), MAX_TIMEOUT_CACHE);
                return chacheObj.object;
            }

            return null;
        }
    }
}