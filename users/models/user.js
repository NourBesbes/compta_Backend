/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var UserSchema = new Schema({
    first_name:String,
    last_name : String,
    login:String,
    email:String,
    role :String,
    password:String,
  //  company : [{ type: Schema.Types.ObjectId, ref: 'Company' }]
});

function hashPassword(password){
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
        return password;
    }
};



var user = mongoose.model('user', UserSchema);

module.exports = user;