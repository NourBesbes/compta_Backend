var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var user = require('./users/routes/user');
var transaction = require('./comptabilite/routes/transaction');
var budget = require('./comptabilite/routes/budget');
var banque = require('./banque/routes/CompteBancaire');
var company = require('./company/routes/company');
var app = express();
var DB = "mongodb://admin:admin@ds023520.mlab.com:23520/devstriker";
var morgan      = require('morgan');
var mongoose    = require('mongoose');



//enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// get our request parameters
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use('/', index);
app.use('/user', user);
app.use('/company', company);
app.use('/banque', banque);
app.use('/transaction', transaction);
app.use('/budget', budget);
mongoose.Promise = global.Promise;
mongoose.connect(DB, function(err) {
    if (err) {
        return err;
    } else {
        console.log('Successfully connected to ' + DB);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;