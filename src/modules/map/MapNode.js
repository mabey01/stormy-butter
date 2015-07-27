/**
 * Created by Maximilian on 18.07.2015.
 */

/** ====== IMPORT ====== **/
var idMaker = require('../util/idMaker');

var ID_LENGTH = 3;
/** ====== EXPORT ====== **/
module.exports = {

    /**
     *
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
        getID : function() {
            return id;
        },
        getTitle : function() {
            return title
        },
        addNode: function(rawMapNode) {
            children.push(MapNodeFactory(rawMapNode));
        },
        getChildren: function() {
            return children;
        },
        update : function(updateObject) {
            if ('title' in updateObject) {
                title = updateObject.title;
            }

            if ('position' in updateObject) {
                position = updateObject.position;
            }
        },
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