/**
 * Created by nour on 6/14/17.
 */
var express = require('express');
var router = express.Router();
var transaction = require('../controllers/Transaction');
var Converter = require("csvtojson").Converter;
var converter = require("xls-to-json");


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/getAll', transaction.listAll);
router.get('/getExComp', transaction.RemplirExCompt);
router.post('/getExComp', transaction.RemplirExCompt);
router.post('/addinfo/:id', transaction.AddInfo);


// Upload route.
router.post('/upload', transaction.uploadFile)


module.exports = router;