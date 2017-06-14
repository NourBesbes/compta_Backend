/**
 * Created by nour on 6/13/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorieSchema = new Schema({
    name:String,
    compte_comptable: number,
   // TVA: number,



});

var categorie = mongoose.model('categorie', CategorieSchema);

module.exports = categorie;
