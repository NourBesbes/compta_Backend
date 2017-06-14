/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CompteBancaire = require('../../banque/models/CompteBancaire.js');
var Budget = require('../models/Budget.js');

var TransactionSchema = new Schema({
    //TransactionId:String,
    montant:Number,
    Date : Date,
    Type:String,
    Description:String,
    Remboursement : Boolean,
    budget : [{ type: Schema.Types.ObjectId, ref: 'Budget' }],
    CompteBancaire : [{ type: Schema.Types.ObjectId, ref: 'CompteBancaire' }],


});

var transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = transaction;