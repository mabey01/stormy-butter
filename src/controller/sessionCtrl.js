/**
 * Created by Maximilian on 29.04.2015.
 */

var express = require('express');
var sessionCTRL = express.Router();

sessionCTRL.route('/')
    .post(function(req, res) {
        console.log(req);
    })
;


module.exports = sessionCTRL;