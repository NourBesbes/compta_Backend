/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
//var Transaction = require('../models/Transaction.js');
const util = require('util');
//Converter Class
var Converter = require("csvtojson").Converter;
var tika = require('tika');
var fs=require("fs");
var converter = require("xls-to-json");
//var file ="/home/nour/Desktop/compta_Backend/comptabilite/example.csv"
var file = "/home/nour/Desktop/compta_Backend/comptabilite/sample.xls"

module.exports= {

    RemplirExCompt: function (req, res, next) {
        //TODO: Depenses + Recettes
    },
    listAll: function (req, res, next) {
       tika.type(file, function (err, contentType) {

       if (contentType == "application/vnd.ms-excel") {
        converter({
            input: file,
            output: null
        }, function (err, result) {
            if (err) {
                console.error(err);
                return err ;
            } else {
               res.json(result)

            }
        }); }
       else if(contentType== "text/csv"){
           var csvConverter = new Converter({});

           //end_parsed will be emitted once parsing finished
           var x=  csvConverter.on("end_parsed", function (jsonObj) {
               res.json(jsonObj) ;

           });
           //read from file
           fs.createReadStream(file).pipe(csvConverter);
       }
       })

    },


    FindById: function (req, res, next) {
        //TODO:
    },


}