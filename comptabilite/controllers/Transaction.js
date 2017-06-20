/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var Transaction = require('../models/Transaction.js');
var budget = require('../models/Budget.js');

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
var Recette=[];
var Depenses =[];
var i =0;
var moment = require('moment');

module.exports= {

    RemplirExCompt: function (req, res, next) {

        Transaction.find({}, function (err, transaction) {
            if (err)
                return next(err);
            transaction.forEach(function(j){
                i++;
                if (req.body.endDate&&req.body.startDate){
                var startDateArr = req.body.startDate.split('/');
                var startDate = new Date(startDateArr[2]+"-"+startDateArr[1]+"-"+startDateArr[0]);
                var endDateArr = req.body.endDate.split('/');
                var endDate = new Date(endDateArr[2]+"-"+endDateArr[1]+"-"+endDateArr[0]);}

                if ((j.Debit&& startDate <= j.Date && j.Date <= endDate )|(j.Debit&&!req.body.startDate&&!req.body.endDate)){
                    Depenses.push({" ":"-"+j.Debit})

                }
                else if ((j.Credit&& req.body.startDate <= j.Date && j.Date <= req.body.endDate )|(j.Credit&&!req.body.startDate&&!req.body.endDate)){
                    Recette.push({" ":"+"+j.Credit})

                }
            });
            if (i=transaction.length){
                res.json({"Depenses":Depenses,"Recettes":Recette})
            }


        });

    },

    uploadFile : function (req,res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // `file` is the name of the <input> field of type `file`
            console.log(files);
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
                       var dateArr ;
                        res.json(jsonObj) ;
                     //save transactions to mongoose
                        jsonObj.forEach(function(j){
                            if(j.Date.indexOf("/") > -1) {
                                dateArr = j.Date.split('/'); }
                            else if(j.Date.indexOf("-") > -1) {
                                dateArr = j.Date.split('-'); }
                            var date = new Date(dateArr[2]+"-"+dateArr[1]+"-"+dateArr[0]);

                            var newTransaction = new Transaction({
                                Date :date ,
                                Debit : j.Debit ,
                                Credit : j.Credit ,
                                Libelle : j.Libelle

                            });
                            newTransaction.save()
                           // console.log(newTransaction)
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
                            var dateArr ;
                            //save transactions to mongoose
                            result.forEach(function(j){
                               if(j.Date.indexOf("/") > -1) {
                                    dateArr = j.Date.split('/'); }
                                else if(j.Date.indexOf("-") > -1) {
                                    dateArr = j.Date.split('-'); }
                                var date = new Date(dateArr[2]+"-"+dateArr[1]+"-"+dateArr[0]);
                                console.log(j.Date,date)

                                var newTransaction = new Transaction({
                                    Date :date ,
                                    Debit : j.Debit ,
                                    Credit : j.Credit ,
                                    Libelle : j.Libelle

                                });
                                newTransaction.save()
                             //   console.log(newTransaction)
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
        Transaction.find({}, function (err, transaction) {
            if (err)
                return next(err);
            res.json(transaction)
        });


},

    FindById: function (req, res, next) {
        Transaction.findById(req.params.id, function (err, comp) {
            res.json(comp);
            if (err) throw err;
        })
    },

    AddInfo:function (req,res) {
        var b ;

        var b = budget.find({"name":req.body.budget}, function (err, res) {
            b=res ;
            console.log(b);
            if (err) throw err;

        });
            if (b) {
                Transaction.update({_id: req.params.id}, {
                    budget: b,
                    sousBudget: req.body.sousBudget
                }, function (err, affected, resp) {
                    console.log("yeeeey");
                    res.json(resp)
                })
            }

    }

}