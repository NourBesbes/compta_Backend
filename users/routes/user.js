/**
 * Created by nour on 6/15/17.
 */

var express = require('express');
var router = express.Router();
var users = require('../controllers/user');
var multer = require('multer');

var Uploader = require('s3-image-uploader');
var upload = multer({ dest: 'uploads/' });
var passport	= require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/addusers', users.AddUsers);
router.post('/authenticate',users.login);
router.post('/signup1',users.SignUp);
router.post('/upload',upload.single('img'),users.uploadImage);
router.put('/update/:id',users.updateUser);
router.get('/findUser/:id',users.findUser);
router.get('/findUserRole/:id',users.roleUser);
router.delete('/deleteUser/:id',users.deleteUser);
router.get('/getUsersFromCompany/:idC',users.getUserFromCompany);
router.get('/getall',users.getUsers);
router.post('/info', passport.authenticate('jwt', { session: false}),users.memberinfo);
module.exports = router;