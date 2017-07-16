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
router.post('/authenticate',users.login);
router.post('/signup1',users.SignUp);
router.put('/update/:id',users.updateUser);
router.get('/findUser/:id',users.findUser);
router.get('/findUserRole/:id',users.roleUser);
router.get('/getall',users.getUsers);
module.exports = router;