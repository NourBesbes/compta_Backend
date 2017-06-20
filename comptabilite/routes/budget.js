/**
 * Created by nour on 6/20/17.
 */
var express = require('express');
var router = express.Router();
var budget = require('../controllers/budget');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', budget.addBudget);
router.get('/listAll', budget.listAll);




module.exports = router;