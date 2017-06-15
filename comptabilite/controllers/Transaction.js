/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var Transaction = require('../models/Transaction.js');
const util = require('util');
//Converter Class
var Converter = require("csvtojson").Converter;
var assert = require('assert')
var fs=require("fs");
var xlConverter = require("xls-to-json");
var http = require('http'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

module.exports= {

    RemplirExCompt: function (req, res, next) {
        //TODO: Depenses + Recettes
    },

    uploadFile : function (req,res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // `file` is the name of the <input> field of type `file`
            console.log(files);
            //return res.json("sa7itek")
            var old_path = files.file.path,
                file_size = files.file.size,
                file_ext = files.file.name.split('.').pop(),
                index = old_path.lastIndexOf('/') + 1,
                file_name = old_path.substr(index),
                new_path=path.join(process.env.PWD, './public/uploads', file_name + '.' + file_ext);

            console.log("new path"+new_path);
            console.log("file name"+file_name);

            fs.readFile(old_path, function(err, data) {

                console.log(old_path);
                if(file_ext== "csv"){
                    var csvConverter = new Converter({});

                    //end_parsed will be emitted once parsing finished
                    var x=  csvConverter.on("end_parsed", function (jsonObj) {
                        res.json(jsonObj) ;
                     //save transactions to mongoose
                        Transaction.collection.insertMany(jsonObj, function(err,r) {
                               })
                    });
                    //read from file
                    fs.createReadStream(old_path).pipe(csvConverter);
                }

                else if (file_ext == "xls") {
                    xlConverter({
                        input: old_path,
                        output: null
                    }, function (err, result) {
                        if (err) {
                            console.error(err);
                            return err ;
                        } else {
                            res.json(result);
                            //save transactions to mongoose
                            Transaction.collection.insertMany(result, function(err,r) {
                                 })

                        }
                    }); }
                fs.writeFile(new_path, data, function(err) {
                    fs.unlink(old_path, function(err) {
                        if (err) {
                            res.status(500);
                            console.log("error uploading file")
                        } else {
                            res.status(200);
                            console.log(new_path+"   uploaded successfully ")
                        }
                    });
                });
            });
        });

    },


    listAll: function (req, res, next) {
       //TODO : from DB

    },


    FindById: function (req, res, next) {
        //TODO:
    },


}