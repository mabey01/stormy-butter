/**
 * Created by Maximilian on 29.04.2015.
 */

/** ====== IMPORT ====== **/

/** ====== EXPORT ====== **/

/** ====== PACKAGE ====== **/

/**
 * interace for storable Objects/Classes
 * @interface
 */
function Storable() {}

/**
 * save object to database
 * @returns {Promise}
 */
Storable.prototype.save = function() {
    throw new Error('not implemented');
};