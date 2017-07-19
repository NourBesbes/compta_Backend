/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var user = require('../models/user.js');
const util = require('util');
var nodemailer = require("nodemailer");
var jwt         = require('jwt-simple');
var passport	= require('passport');
var config      = require('../config/database'); // get db config file

var path = require('path');

var multer = require('multer');

var Uploader = require('s3-image-uploader');
var upload = multer({ dest: 'uploads/' });

var uploader = new Uploader({
    aws : {
        key : "AKIAIQTGLJKQOWWQPONA",
        secret : "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"
    },
    websockets : false
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


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports= {

    login: function(req, res) {
  user.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, role:user.role,username:user.username,company:user.company});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
},
    SignUp: function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
   var newUser = new user({
      username: req.body.username,
      password: req.body.password,
      imagePath: req.body.imagePath,
       first_name:req.body.firstName,
       last_name:req.body.lastName,
       email:req.body.email,
       company:req.body.company,
      role:req.body.role
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.',err:err});
      }
      res.json({success: true, msg: 'Successful created new user.',username:user.username});
    });
  }
},

    AddUsers: function(req,res,next) {
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "devstrikerdev@gmail.com",
                pass: "12345678dev"
            }
        });
        var mailOptions={
            to : req.body.to ,
            subject : "Register Yourself",
            text : req.body.text 
        };
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.status(404).json();
            }else{
                //console.log("Message sent: " + response.message);
                //res.end("sent");
                res.json({success: true, msg: 'Successful added new user.'});
            }
        });
    },
    getUsers:function(req, res, next) {
    user.find(function(err, users) {
      if (err) return res.status(400).json(err);

      res.status(200).json(users);
    });
  },
    roleUser:function(req, res, next) {
        user.findOne({
            username: req.params.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user.role);


        });
    },
    findUser:function(req, res, next) {
        user.findOne({
            username: req.params.id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user);


            }).populate('company');
    },
    updateUser:function(req, res, next) {
        user.findOneAndUpdate({
            username: req.params.id
        },req.body, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user);


        });
    },
    getUserFromCompany:function(req, res, next) {
        user.find({
            company:req.params.idC
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user);


        });
    },
    deleteUser:function(req,res)
    {
        user.findOne({
            username:req.params.id
        }, function(err, user) {
            if (err) throw err;

            // delete him
            user.remove(function(err) {
                if(err){
                    res.send(err);
                }
                res.json(user);
                console.log('user successfully deleted!');
            });
        });
    },
    uploadImage:function(req, res, next){

        uploader.upload({
                fileId : 'someUniqueIdentifier',
                bucket : 'node-sdk-sample-1234',
                source : req.file.path,
                name : req.file.originalname
            },
            function(data){ // success
                console.log('upload success:', data);
                // execute success code
            },
            function(errMsg, errObject){ //error
                if(errMsg)
                    console.error('unable to upload: ' + errMsg + ':', errObject);
                // execute error code
            });
        console.log("file "+req.file.path);
        res.json({lien:"https://s3.amazonaws.com/node-sdk-sample-1234/"+req.file.originalname});

    },
    memberinfo:function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            console.log(decoded);
            user.findOne({
                username: decoded.username,
                role:decoded.role
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    res.json({success: true, msg: 'Welcome in the member area ' + user.first_name + '!'});
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }
    }
}