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
    },
    addSousBudget: function (req, res, next) {
        //TODO:
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