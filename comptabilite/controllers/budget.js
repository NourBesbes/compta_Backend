/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var budget = require('../models/Budget.js');
const util = require('util');
module.exports= {

    addBudget: function (req, res, next) {
        newbudget=new budget({
            name:req.body.name,

<<<<<<< HEAD

        });
        newbudget.save(function(err) {
            if (err) throw err;
            console.log("budget added");

        })
    },
=======
        });
        newbudget.save(function(err) {
            if (err) throw err;
            console.log("Budget added");
        })
    },
    listAll: function (req, res, next) {
        budget.find({}, function (err, budget) {
            if (err)
                return next(err);
            res.json(budget)
        });
>>>>>>> 83820ccfa51e0b72e6ca63088bef79c3157b7b17
    },
    addSousBudget: function (req, res, next) {
        budget.update({_id:req.params.id}, {$addToSet: {sousBudget: req.body.sousBudget}}, {multi:  true},function (err, sousBudget) {
            if (err)
                return next(err);
            console.log(sousBudget);
        })
    },
    deleteBudget: function (req, res, next) {
        //TODO:
    },
    deleteSousBudget: function (req, res, next) {
        //TODO:
    },
    FindByName: function (req, res, next) {
        //TODO:
    },

}