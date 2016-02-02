/**
 * Created by Maximilian on 18.07.2015.
 */

/** ====== IMPORT ====== **/
var idMaker = require('../util/idMaker');

var ID_LENGTH = 3;
/** ====== EXPORT ====== **/
module.exports = {

    /**
     * construct a new MapNode Object
     * @param {Object} specs
     * @returns {MapNode}
     */
    construct : function(specs) {
        if (!specs) throw new Error("no specs provided to create new Session");
        return MapNodeFactory(specs);
    }
};

/** ====== PACKAGE ====== **/

/**
 @class MapNode
 @type {Object}
 @property {function(): string} getID get the id of the MapNode
 @property {function(): String} getTitle
 @property {function(Object)} addNode
 @property {function(): Array<MapNode>} getChildren
 @property {function(Object)} update
 @property {function(): Object} serialize
 */

/**
 *
 * @param {Object} specs
 * @returns {MapNode}
 * @constructor
 */
function MapNodeFactory(specs) {
    var id = null;
    if ('id' in specs) {
        id = specs.id;
    } else {
        id = idMaker.createID(ID_LENGTH);
    }

    var position = {};
    if ('position' in specs) {
        position = specs.position;
    } else {
        position.x = 0;
        position.y = 0;
    }

    var title = '';
    if ('title' in specs) {
        title = specs.title;
    }

    var children = [];
    if ('children' in specs) {
        children = specs.children.map(function(rawMapNode) {
            return MapNodeFactory(rawMapNode);
        })
    }

    return {
        /**
         * get MapNode id
         * @returns {String}
         */
        getID : function() {
            return id;
        },

        /**
         * get title of MapNode Object
         * @returns {string}
         */
        getTitle : function() {
            return title
        },

        /**
         * add new MapNode Object by raw MapNode Object
         * @param {Object} rawMapNode
         */
        addNode: function(rawMapNode) {
            children.push(MapNodeFactory(rawMapNode));
        },

        /**
         * get all children from MapNode
         * @returns {Array.<MapNode>}
         */
        getChildren: function() {
            return children;
        },

        /**
         * update MapNode by Object
         * @param {Object} updateObject
         */
        update : function(updateObject) {
            if ('title' in updateObject) {
                title = updateObject.title;
            }

            if ('position' in updateObject) {
                position = updateObject.position;
            }
        },

        /**
         * get serialized version of this MapNode
         * @returns {{id: *, title: string, position: {}, children: Array}}
         */
        serialize : function() {
            return {
                id : id,
                title: title,
                position : position,
                children : children.map(function(mapNode) {
                    return mapNode.serialize();
                })
            }
        }
    };
}