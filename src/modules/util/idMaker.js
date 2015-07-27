/**
 * Created by Maximilian on 12.07.2015.
 */

var CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = {
    createID : createID
};

function createID(length) {
    var charLength = length || 16;
    var uid = '';

    for (var i = 0; i < charLength; i++) {
        uid += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return uid;
}