/**
 * Created by Maximilian on 29.04.2015.
 */

var express = require('express');
var sessionCTRL = express.Router();

var SessionFactory = require('../modules/sessions/Session');

sessionCTRL.route('/')
    .post(function(req, res) {
        var submittedForm  = req.form.fields;

        var session = SessionFactory.construct(submittedForm);

        session.save().then(
            function(savedSession) {
                res.status(200).send({id : savedSession._id});
                console.log('SUCCESS: ', savedSession);
            },
            function(error) {
                res.status(500).send();
                console.log('ERROR: ', error);
            }
        );
    })
;

sessionCTRL.route('/:id')
    .get(function (req, res) {
        var sessionID = req.params.id;

        SessionFactory.find({_id: sessionID}).then(
            function (result) {
                res.status(200).send(result);
                console.log("SUCCESS: ", result);
            },
            function (error) {
                res.status(500).send();
                console.log('ERROR: ', error);
            }
        )
    })
;


module.exports = sessionCTRL;