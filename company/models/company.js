/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var PeriodeComptable = require('../models/PeriodeComptable.js');
var User = require('../../users/models/user.js');

var CompanySchema = new Schema({
    name:String,
    matricule : String,
    adress:String,
    user : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    //periode: [{ type: Schema.Types.ObjectId, ref: 'PeriodeComptable' }],

});

var company = mongoose.model('Company', CompanySchema);

module.exports = company;