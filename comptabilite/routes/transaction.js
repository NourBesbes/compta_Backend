/**
 * Created by nour on 6/14/17.
 */
var express = require('express');
var router = express.Router();
var transaction = require('../controllers/Transaction');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/getAll', transaction.listAll);

module.exports = router;