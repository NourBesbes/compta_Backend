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
        budget.find({}, function (err, budget) {
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
    /*GetExerciceComptable: function (req, res, next) {
        var b ;
        var desp =0;
        var rec =0;
        var resultat;

        budget.find({}, function (err, budget) {
            if (err)
                return next(err);
            budget.forEach(function(j) {
                i++;
                Transaction.find({budget: j}, function (err, transaction) {
                    transaction.forEach(function (t) {
                        if (req.body.endDate && req.body.startDate) {
                            var startDateArr = req.body.startDate.split('/');
                            var startDate = new Date(startDateArr[2] + "-" + startDateArr[1] + "-" + startDateArr[0]);
                            var endDateArr = req.body.endDate.split('/');
                            var endDate = new Date(endDateArr[2] + "-" + endDateArr[1] + "-" + endDateArr[0]);
                        }

                        if ((t.Debit && startDate <= t.Date && t.Date <= endDate ) | (t.Debit && !req.body.startDate && !req.body.endDate)) {
                            desp = desp + parseInt(t.Debit);
                            // Depenses.push({"valeur": "-" + j.Debit, "libelle": j.Libelle})

                        }
                        else if ((t.Credit && req.body.startDate <= t.Date && t.Date <= req.body.endDate ) | (t.Credit && !req.body.startDate && !req.body.endDate)) {
                            //Recette.push({"valeur": "+" + j.Credit, "libelle": j.Libelle})
                            rec = rec + parseInt(t.Credit);
                        }
                    }).then(function(value) {
                        desp=0;
                        rec=0;
                        resultat.push({"budget":j.name,"depenses":desp,"recettes":rec})
                    });
                });
                if (i = budget.length) {
                    res.json(resultat)
                }

            });
        });



        // return {"budget":  , "sousbudget": ,"Montant":}

    }*/

}