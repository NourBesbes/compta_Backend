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

    },
    deleteBudget: function (req, res, next) {
        budget.findById(req.params.id , function(err, budget) {
            if (err) throw err;

            // delete him
            comp.remove(function(err) {
                if (err) throw err;

                console.log('company successfully deleted!');
            });
        });
    },
    deleteSousBudget: function (req, res, next) {
        budget.update({ _id: req.params.id }, { "$pull": { "sousBudget": req.body.sousBudget  }},
            { safe: true, multi:true }, function(err, obj) {
    },
    FindByName: function (req, res, next) {
        User.find({ name: req.body.name }, function(err, budget) {
            if (err) throw err;

            // object of the user
            console.log(budget);
        });
    },

}