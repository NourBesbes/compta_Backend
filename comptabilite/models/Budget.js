/**
 * Created by nour on 6/13/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorie = require('../models/Categorie.js');
var BudgetSchema = new Schema({
    name:String,
    sousBudget : [{type:String}],
  //  login:String,
    categorie : [{ type: Schema.Types.ObjectId, ref: 'Categorie' }],
    transactions : [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
});

var budget = mongoose.model('Budget', BudgetSchema);

module.exports = budget;
