/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var user = require('../models/user.js');
const util = require('util');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "devstrikerdev@gmail.com",
        pass: "12345678dev"
    }
});
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
    AddUsers: function (req, res, next) {

        var mailOptions = {
            to: req.body.to,
            subject: "Invitation",
            text: "this is a test"
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });
    }
}