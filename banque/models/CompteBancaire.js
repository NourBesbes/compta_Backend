/**
 * Created by nour on 6/13/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompteBancaireSchema = new Schema({
    name:String,
    swift : string,
    IBAN:String,
    Banque:String

});

var compteBancaire = mongoose.model('CompteBancaire', CompteBancaireSchema);

module.exports = compteBancaire;
