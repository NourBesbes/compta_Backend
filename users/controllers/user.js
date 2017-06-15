/**
 * Created by nour on 6/13/17.
 */

var express = require('express');
var user = require('../models/user.js');
const util = require('util');
var mandrill = require('node-mandrill')('tc7CdVvSVFY4dDYyEA6eYA');
function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'mariemloukil1@gmail.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error)
            console.log( error );
        else
            console.log(response);
    });
}
module.exports= {

    login: function (req, res, next) {
        //TODO:
    },
    SignUp: function (req, res, next) {
        //TODO:
    },
    AddUsers: function(req,res,next) {

        var _name = req.body.name;
        var _email = req.body.email;
        var _subject = "test";
        var _messsage = "this is a test";

        //implement your spam protection or checks.

        sendEmail ( _name, _email, _subject, _messsage );
    }


}