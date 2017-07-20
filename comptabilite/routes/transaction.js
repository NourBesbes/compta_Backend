/**
 * Created by nour on 6/14/17.
 */
var express = require('express');
var router = express.Router();
var transaction = require('../controllers/Transaction');
var Converter = require("csvtojson").Converter;
var converter = require("xls-to-json");
var multer = require("multer");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/getbycompany/:id', transaction.listbycompany);
router.get('/getExComp/:id', transaction.RemplirExCompt);
router.post('/getExComp/:id', transaction.RemplirExCompt);
router.post('/addinfo/:id', transaction.AddInfo);
// Upload route.
router.post('/upload/:id', transaction.uploadFile)
router.delete('/delete/:id', transaction.delete);

module.exports = router;