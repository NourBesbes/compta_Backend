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
        Transaction.find({}).sort('sousBudget').exec(function(err, transaction) {
            tab.push(transaction[0]);

            for (i = 1; i < transaction.length; i++) {

                if (!(transaction[i].sousBudget == undefined) && !(transaction[i - 1].sousBudget == undefined)) {
                    if (transaction[i].sousBudget == transaction[i - 1].sousBudget) {
                        tab.push(transaction[i]);
                    }
                    else {
                        resultat.push({"sous Budget": transaction[i - 1].sousBudget, "Transactions": tab});
                        tab = [];
                    }
                }

                if (i == (transaction.length - 1)) {
                    resultat.push({"sousBudget": transaction[i].sousBudget, "Transactions": tab});
                    /*resultat.forEach(function (res) {
                        for (i = 1; i < res.Transactions.length; i++) {
                            if (res.Transactions[i].Credit){recette=recette+res.Transactions[i].Credit}
                            if (res.Transactions[i].Debit){dep=dep+res.Transactions[i].Debit}
                        if(i==res.Transactions.length){
                            finalresult.push({"Sous Budget":res.Transactions[i].sousBudget,"Depenses":dep,"Recette":recette});
                            recette=0;
                            dep=0;
                        }
                        }
                    });*/
                 //   console.log(finalresult);

                    res.json(resultat);

                }
            }

            if (err)
                return next(err);
            });



        // return {"budget":  , "sousbudget": ,"Montant":}

    }
};
