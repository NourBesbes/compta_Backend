/**
 * Created by nour on 6/20/17.
 */
var express = require('express');
var router = express.Router();
var budget = require('../controllers/budget');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addbudget', budget.addBudget);
router.post('/addsousbudget/:id', budget.addSousBudget);
router.get('/listAll', budget.listAll);

router.delete('/deletebudget/:id', budget.deleteBudget);
router.post('/deleteousbudget/:id', budget.deleteSousBudget);
router.get('/getbudget/:name', budget.FindByName);
router.put('/update/:id', budget.update);
router.get('/getSousBudget/:name',budget.FindByName);

module.exports = router;