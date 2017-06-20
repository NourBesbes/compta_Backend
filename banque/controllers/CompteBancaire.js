/**
 * Created by nour on 6/13/17.
 */

var express = require('express');
var CompteBancaire = require('../models/CompteBancaire.js');
const util = require('util');
module.exports= {

    addCompte: function (req, res, next) {
        comptebancaire= new CompteBancaire({
            name:req.body.name,
            swift :req.body.swift,
            IBAN:req.body.IBAN,
            Banque:req.body.Banque
        })
        comptebancaire.save(function(err) {
            if (err) throw err;
            console.log('account added');
        });
    },

    deleteCompte: function (req, res, next) {
        CompteBancaire.findById(req.params.id , function(err, comptebancaire) {
            if (err) throw err;

            // delete him
            comptebancaire.remove(function(err) {
                if (err) throw err;

                console.log('Compte successfully deleted!');
            });
        });
    },

    listAll: function (req, res, next) {
        CompteBancaire.find({}, function(err, compte) {
            if (err) throw err;
            // object of all the users
            console.log(compte);
            res.json(compte)
        });
    },


    Synchroniser: function (req, res, next) {
        //TODO: Etudier l'integration d'API existantes de type "Banking"
    }
}