/**
 * Created by nour on 6/15/17.
 */

var express = require('express');
var router = express.Router();
var users = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/addusers', users.AddUsers);

module.exports = router;