/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeriodeComptableSchema = new Schema({
    Date_deb:Date,
    Date_fin : Date,
});

var periodeComptable = mongoose.model('PeriodeComptable', PeriodeComptableSchema);

module.exports = periodeComptable;