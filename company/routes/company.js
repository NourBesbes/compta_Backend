/**
 * Created by med on 16-Jun-17.
 */
var express = require('express');
var router = express.Router();
var company = require('../controllers/company');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/addcompany', company.addCompany);
router.delete('/deletecompany/:id', company.deleteCompany);
router.get('/findcompany/:id', company.FindById);
router.get('/listalll', company.listAll);
module.exports = router;
