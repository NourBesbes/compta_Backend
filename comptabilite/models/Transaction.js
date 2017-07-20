/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CompteBancaire = require('../../banque/models/CompteBancaire.js');
var Budget = require('../models/Budget.js');

var TransactionSchema = new Schema({
    //TransactionId:String,
    Debit:Number,
    Credit:Number,
    Date : Date,
    DateTransaction:Date,
    TypePaiement:String,
    Libelle:String,
    Remboursement : Number,
    budget : [{ type: Schema.Types.ObjectId, ref: 'Budget' }],
    sousBudget : String ,
    CompteBancaire : [{ type: Schema.Types.ObjectId, ref: 'CompteBancaire' }],
    company : { type: Schema.Types.ObjectId, ref: 'Company' }


});

var transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = transaction;