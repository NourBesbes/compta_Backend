/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var UserSchema = new Schema({
  imagePath:{
      type: String,
      default:"https://s3.amazonaws.com/node-sdk-sample-1234/web-user.jpg"
  },
    username:{
        type: String,
        unique: true,

    },
    email:{
        type: String

    },
    role :{
        type: String
    },
    password:{
        type: String
    },
    first_name:{
        type: String

    },
    last_name : {
        type: String
      
    },
    company : { type: Schema.Types.ObjectId, ref: 'Company' }
});



UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('user', UserSchema);
