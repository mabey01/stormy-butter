/**
 * Created by Maximilian on 23.07.2015.
 */
var express = require('express');
var timeCTRL = express.Router();

var SessionFactory = require('../modules/sessions/Session');

timeCTRL.route('/')
    .get(function(req, res) {
        res.status(200).send(Date.now().toString());
    })
;

module.exports = timeCTRL;