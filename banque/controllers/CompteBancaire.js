/**
 * Created by nour on 6/13/17.
 */

var express = require('express');
var CompteBancaire = require('../models/CompteBancaire');
const util = require('util');
module.exports= {

    addCompte: function (req, res, next) {
        comptebancaire= new CompteBancaire({
            name:req.body.name,
            swift :req.body.swift,
            IBAN:req.body.IBAN,
            Banque:req.body.Banque,
            company:req.body.company
        })
        comptebancaire.save(function(err) {
            if (err) throw err;
           // console.log('account added');
            res.json(comptebancaire);
        });
    },

    deleteCompte: function (req, res, next) {
        CompteBancaire.findById(req.params.id , function(err, comptebancaire) {
            if (err) throw err;

            // delete him
            comptebancaire.remove(function(err,banque) {
                if(err){
                    res.send(err);
                }
                res.json(banque);
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

// Update
    update : function(req, res, next) {
        var banque = req.body;
        console.log(banque);
        var id = req.params.id
        var updBanque = {};

        if (banque.Banque) {
            updBanque.Banque = banque.Banque;
        }
        if (banque.swift) {
            updBanque.swift = banque.swift;
        }
        if (banque.IBAN) {
            updBanque.IBAN = banque.IBAN;
        }
        if (banque.name) {
            updBanque.name = banque.name;
        }

        if (!updBanque) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            CompteBancaire.update({_id: req.params.id}, updBanque, {}, function (err, banque) {
                if (err) {
                    res.send(err);
                }
                res.json(banque);
            });
        }
    },
getbycompany:function (req, res, next) {
    CompteBancaire.find({company:req.params.id}, function(err, compte) {
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