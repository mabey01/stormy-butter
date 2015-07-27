/**
 * Created by Maximilian on 12.07.2015.
 */

/** ====== IMPORT ====== **/
var q = require('q');
var idMaker = require('../util/idMaker');
var MapNodeFactory = require('./MapNode');

var ID_LENGTH = 3;
/** ====== EXPORT ====== **/
module.exports = {
    /**
     * construct a new instance of Map
     * @param {Object} specs
     * @return {Map}
     */
    construct : function(specs) {
        if (!specs) throw new Error("no specs provided to create new Session");
        return MapFactory(specs);
    }
};

/** ====== PACKAGE ====== **/

/**
 @class Map
 @type {Object}
 @property {function(String): MapNode} getNodeByID
 @property {function(Object)} insertRawNode
 @property {function(Object)} updateRawNode
 @property {function(): MapNode} getRoot
 @property {function(): Object} serialize
 */

/**
 *
 * @param {Object} specs
 * @returns {Map}
 * @constructor
 */
function MapFactory(specs) {
    var root = MapNodeFactory.construct(specs);

    return {
        getNodeByID: function(id, node) {
            if (!node) node = this.getRoot();
            var parentID = null;
            var childID = null;

            if (id.length > ID_LENGTH) {
                parentID = id.substr(0,ID_LENGTH);
                childID = id.substr(ID_LENGTH);
            } else {
                childID = id;
            }

            var nodeID = node.getID();
            nodeID = nodeID.substr(nodeID.length - ID_LENGTH);

            if (childID == nodeID) return node;
            else if(nodeID == parentID) {
                return node.getChildren().reduce(function(nodeFound, currentNode) {
                    if (nodeFound == null) {
                        return this.getNodeByID(childID, currentNode);
                    } else {
                        return nodeFound;
                    }
                }.bind(this), null)
            }
        },

        insertRawNode: function(rawNodeSpecs) {
            var id = rawNodeSpecs.id;
            var parentID = id.substr(0,id.length - ID_LENGTH);
            var parent = this.getNodeByID(parentID);
            parent.addNode(rawNodeSpecs);
        },

        updateRawNode: function(rawNodeSpecs) {
            var id = rawNodeSpecs.id;
            var updateNode = this.getNodeByID(id);
            updateNode.update(rawNodeSpecs);
        },

        getRoot : function() {
            return root
        },

        serialize : function() {
            return root.serialize();
        }
    }
}