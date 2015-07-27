/**
 * Created by Maximilian on 29.04.2015.
 */

var express = require('express');
var sessionCTRL = express.Router();

var Session = require('../modules/sessions/Session');

sessionCTRL.route('/')
    .post(function(req, res) {
        var submittedForm  = req.form.fields;

        Session.insertNewSession(submittedForm).then(
            function(savedSession) {
                res.status(200).send(savedSession.serialize());
            },
            function(error) {
                res.status(500).send();
            }
        );
    })
;

sessionCTRL.route('/:id')
    .get(function (req, res) {
        var sessionID = req.params.id;

        Session.findByID(sessionID).then(
            function (session) {
                res.status(200).send(session.serialize());
            },
            function (error) {
                res.status(500).send();
            }
        )
    })
;


module.exports = sessionCTRL;