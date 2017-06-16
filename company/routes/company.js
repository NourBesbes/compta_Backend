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
router.post('/deletecompany', company.deleteCompany);
router.post('/findcompany', company.FindById);
router.post('/findallcompanies', company.listAll);
module.exports = router;
