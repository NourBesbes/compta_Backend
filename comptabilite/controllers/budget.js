/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var budget = require('../models/Budget.js');
const util = require('util');
var Transaction = require('../models/Transaction.js');

module.exports= {

    addBudget: function (req, res, next) {
        newbudget=new budget({
            name:req.body.name,

        });
        newbudget.save(function(err) {
            if (err) throw err;
            res.json("Budget added")
            console.log("Budget added");
        })
    },
    listAll: function (req, res, next) {
        budget.find().populate('transactions').
        exec(function (err, budget) {
            if (err)
                return next(err);
            res.json(budget)
        });

    },
    addSousBudget: function (req, res, next) {
        budget.update({_id:req.params.id}, {$addToSet: {sousBudget: req.body.sousBudget}}, {multi:  true},function (err, sousBudget) {
            if (err)
                return next(err);
            console.log(sousBudget);
            res.json(sousBudget);
        })
    },
    deleteBudget: function (req, res, next) {
        budget.findById(req.params.id , function(err, b) {
            if (err) throw err;

            // delete him
            b.remove(function(err) {
                if(err){
                    res.send(err);
                }
                res.json(b);
                console.log('budget successfully deleted!');
            });
        });
    },

    deleteSousBudget: function (req, res, next) {
        budget.update({ _id: req.params.id }, { $pull: { sousBudget: req.body.sousBudget}}, function(err, obj) {
                if (err) throw err;
                console.log(req.body);
                res.json(obj)
            });
    },
    FindByName: function (req, res, next) {
        budget.find({ name: req.params.name }, function(err, budget) {
            if (err) throw err;

            // object of the budget
            res.json(budget);
        });
    },
    getSousBudget: function (req, res, next) {
        budget.find({ _id: req.params.id }, function(err, budget) {
            if (err) throw err;

            // object of the budget
            res.json(budget)
        });
    },
    // Update
    update : function(req, res, next) {
        var b = req.body;
        console.log(b);
        var id = req.params.id
        var updBudget = {};

        if (b.name) {
            updBudget.name = b.name;
        }

        if (!updBudget) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            budget.update({_id: req.params.id}, updBudget, {}, function (err, b) {
                if (err) {
                    res.send(err);
                }
                res.json(b);
            });
        }
    },
    GetExerciceComptable: function (req, res, next) {
        var tab =[];
        var i=0;
        var k=0;
        var dep=0;
        var recette=0;
        var resultat=[];
        var finalresult=[];
        Transaction.find({company:req.params.id}).sort('sousBudget').populate({path:'budget',select:'name'}).exec(function(err, transaction) {
            tab.push(transaction[0]);

            for (i = 1; i < transaction.length; i++) {

                if (!(transaction[i].sousBudget == undefined) && !(transaction[i - 1].sousBudget == undefined)) {
                    if (transaction[i].sousBudget == transaction[i - 1].sousBudget) {
                        tab.push(transaction[i]);
                    }
                    else {
                        resultat.push({"sousBudget": transaction[i - 1].sousBudget, "Transactions": tab});
                        tab = [];
                    };
                }

                if (i == (transaction.length - 1)) {
                    tab.push(transaction[i]);
                    resultat.push({"sousBudget": transaction[i].sousBudget, "Transactions": tab});
                    resultat.forEach(function (res) {
                        if (req.body.endDate&&req.body.startDate){
                            var startDateArr = req.body.startDate.split('/');
                            var startDate = new Date(startDateArr[2]+"-"+startDateArr[1]+"-"+startDateArr[0]);
                            var endDateArr = req.body.endDate.split('/');
                            var endDate = new Date(endDateArr[2]+"-"+endDateArr[1]+"-"+endDateArr[0]);}

                        for (var k = 0; k < res.Transactions.length; k++) {

                            if ((res.Transactions[k].Debit&& startDate <= res.Transactions[k].Date && res.Transactions[k].Date <= endDate )
                                |(res.Transactions[k].Debit&&!req.body.startDate&&!req.body.endDate))
                                         {
                                             dep=dep+res.Transactions[k].Debit
                                         }

                            else if ((res.Transactions[k].Credit&& req.body.startDate <= res.Transactions[k].Date && res.Transactions[k].Date <= req.body.endDate )
                                |(res.Transactions[k].Credit&&!req.body.startDate&&!req.body.endDate))
                                          {
                                              recette=recette+res.Transactions[k].Credit ;

                                          }
                        if(k==res.Transactions.length-1){
                            if(res.Transactions[k].budget[0]){
                            finalresult.push({"Budget":res.Transactions[k].budget[0]["name"],"SousBudget":res.Transactions[k].sousBudget,"Depenses":dep,"Recette":recette});
                            recette=0;
                            dep=0;
                        }
                        }
                        }
                    });

                   res.json(finalresult);

                }
            }

            if (err)
                return res.send();
            });

    }
};
