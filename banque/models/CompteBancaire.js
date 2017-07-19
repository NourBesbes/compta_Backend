/**
 * Created by nour on 6/13/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompteBancaireSchema = new Schema({
    name:String,
    swift : String,
    IBAN:String,
    Banque:String,
    company : { type: Schema.Types.ObjectId, ref: 'Company' }

});

var compteBancaire = mongoose.model('CompteBancaire', CompteBancaireSchema);

module.exports = compteBancaire;
