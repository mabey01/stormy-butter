/**
 * Created by Maximilian on 11.07.2015.
 */

var sessionFactory = require('../sessions/Session');
var io = null;

function onConnection(socket) {
    console.log("CONNECTED", socket.id);

    socket.on("sessionID", function (sessionID) {
        socket.sessionID = sessionID;

        socket.join(socket.sessionID);
        var room = io.sockets.adapter.rooms[socket.sessionID];
        var count = Object.keys(room).length;

        socket.emit("numberOfUsers", count);
        socket.broadcast.to(socket.sessionID).emit('joinedUser');
    });

    socket.on("newNode", function (rawNode) {
        sessionFactory.findByID(socket.sessionID).then(function(session) {
            session.getMap().insertRawNode(rawNode);
            session.save();
        });
        socket.broadcast.to(socket.sessionID).emit('newNode', rawNode);
    });

    socket.on("updateNode", function (rawNode) {
        sessionFactory.findByID(socket.sessionID).then(function(session) {
            session.getMap().updateRawNode(rawNode);
            session.save();
        });
        socket.broadcast.to(socket.sessionID).emit('updateNode', rawNode);
    });

    socket.on('disconnect', function () {
        socket.leave(socket.sessionID);
        socket.broadcast.to(socket.sessionID).emit('leftUser');
    });
}

module.exports = {
    setSocket : function(_io) {
        io = _io;
        io.sockets.on("connection", onConnection);
    }
};