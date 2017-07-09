/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var company = require('../models/company.js');
const util = require('util');
module.exports= {

    addCompany: function (req, res, next) {

        newcompany=new company({
            name:req.body.name,
            matricule : req.body.matricule,
            adress : req.body.adress


        });
        newcompany.save(function(err,company) {
            if (err) throw err;
           else res.json(company);

    })
},
deleteCompany: function (req, res, next) {
    company.findById(req.params.id , function(err, comp) {
        if (err) throw err;

        // delete him
        comp.remove(function(err) {
            if (err) throw err;

            console.log('company successfully deleted!');
        });
    });
},
FindById: function (req, res, next) {
    company.findById(req.params.id , function(err, comp) {
        res.json(comp);
        if (err) throw err;
    });

},
listAll: function(req,res,next) {
    company.find({}, function(err, comp) {
        if (err) throw err;

        // object of all the users
        console.log(comp);
        res.json(comp)
    });
}
}