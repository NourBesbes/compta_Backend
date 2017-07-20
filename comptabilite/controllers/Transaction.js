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
    fs = require('fs');
 var   path = require('path');
var moment = require('moment');

module.exports= {

    RemplirExCompt: function (req, res, next) {
        var i =0;
        var Recette=[];
        var Depenses =[];
        Transaction.find({company:req.params.id}).populate({ path: 'budget', select: 'name' }).
        exec(function (err, transaction) {
            if (err)
                return next(err);
            transaction.forEach(function(j){
                i++;
                if (req.body.endDate&&req.body.startDate){
                var startDateArr = req.body.startDate.split('/');
                var startDate = new Date(startDateArr[2]+"-"+startDateArr[1]+"-"+startDateArr[0]);
                var endDateArr = req.body.endDate.split('/');
                var endDate = new Date(endDateArr[2]+"-"+endDateArr[1]+"-"+endDateArr[0]);}

                if ((j.Debit&& startDate <= j.Date && j.Date <= endDate && (!(j.budget[0]== undefined))  )|(j.Debit&&!req.body.startDate&&!req.body.endDate&&(!(j.budget[0]== undefined))))
                {
                    Depenses.push({"valeur":"-"+j.Debit,"libelle":j.Libelle,"sousBudget":j.sousBudget,"budget":j.budget[0]["name"]})

                }
                else if ((j.Credit&& req.body.startDate <= j.Date && j.Date <= req.body.endDate&&(!(j.budget[0]== undefined) ))|(j.Credit&&!req.body.startDate&&!req.body.endDate&&(!(j.budget[0]== undefined))))
                {
                    Recette.push({"valeur":"+"+j.Credit,"libelle":j.Libelle,"sousBudget":j.sousBudget,"budget":j.budget[0]["name"]})

                }
            });
            if (i=transaction.length){
                res.json({"Depenses":Depenses,"Recettes":Recette})
            }


        });

    },

    uploadFile : function (req,res) {
        console.log("hii");
        var form = new formidable.IncomingForm();
        form.multiples = false;
        console.log("hii2");

            var p= path.join( './public/uploads');
        form.uploadDir=p;
        console.log("hii3");
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            console.log(file.name);
            console.log(file.type);
            if(file.type== "text/csv"){
                var date ;
                var csvConverter = new Converter({});

                //end_parsed will be emitted once parsing finished
                var x=  csvConverter.on("end_parsed", function (jsonObj) {
                    var dateArr ;
                    res.json(jsonObj) ;
                    //save transactions to mongoose
                    jsonObj.forEach(function(j){

                        if(Date) {
                            if (j.Date.indexOf("/") > -1) {
                                dateArr = j.Date.split('/');
                            }
                            else if (j.Date.indexOf("-") > -1) {
                                dateArr = j.Date.split('-');
                            }
                            date = new Date(dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0]);
                        }

                        var newTransaction = new Transaction({
                            Date :date ,
                            Debit : j.Debit ,
                            Credit : j.Credit ,
                            Libelle : j.Libelle,
                            company:req.params.id

                        });
                        newTransaction.save()
                        console.log(newTransaction)
                    })

                });
                //read from file
                fs.createReadStream(path.join(form.uploadDir, file.name)).pipe(csvConverter);
            }

            else if (file.type == "application/vnd.ms-excel") {
                var date;
                xlConverter({
                    input:  path.join(form.uploadDir, file.name),
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
                            if(j.Date) {
                                if (j.Date.indexOf("/") > -1) {
                                    dateArr = j.Date.split('/');
                                }
                                else if (j.Date.indexOf("-") > -1) {
                                    dateArr = j.Date.split('-');
                                }
                                 date = new Date(dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0]);
                            }
                           // console.log(j.Date,date)

                            var newTransaction = new Transaction({
                                Date :date ,
                                Debit : j.Debit ,
                                Credit : j.Credit ,
                                Libelle : j.Libelle,
                                company:req.params.id

                            });
                            newTransaction.save()
                           console.log(newTransaction)
                        })

                    }
                }); }

        });

        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        /*form.on('end', function() {
            res.end('success');
        });*/

        form.parse(req);

    },

    listbycompany: function (req, res, next) {
        Transaction.find({company:req.params.id}).populate({ path: 'budget', select: 'name' }).
        exec(function (err, transaction) {
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
        var budgetId;

        budget.find({name:req.body.budget}, function (err, result) {
            Transaction.update(
                {_id:req.params.id},
                {
                    $set:{
                      budget: result,
                      sousBudget: req.body.sousBudget
                }}
                ,{new: true}, function (err,res) {
                    if (err) return console.error(err);
                    Transaction.findById(req.params.id, function (err, trans) {
                        if (err) throw err;
            budget.update({_id:result[0]["_id"]},{$addToSet: {transactions: trans}}, {multi:  true}

                , function (err,res) {
                    console.log(res)
                    if (err) return console.error(err);
                })
                });
                })

            if (err) throw err;
        });
        res.json("ok")
    },

    delete: function (req, res, next) {
        Transaction.findById(req.params.id , function(err, transaction) {
            if (err) throw err;

            // delete him
            transaction.remove(function(err,tran) {
                if(err){
                    res.send(err);
                }
                res.json(tran);
                console.log('Transaction successfully deleted!');
            });
        });
    },

}