/**
 * Created by nour on 6/20/17.
 */
var express = require('express');
var router = express.Router();
var budget = require('../controllers/budget');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

<<<<<<< HEAD
router.post('/addbudget', budget.addBudget);
router.post('/addsousbudget/:id', budget.addSousBudget);
=======
router.post('/add', budget.addBudget);
router.post('/addsousbudget/:id', budget.addSousBudget);

>>>>>>> 5feab76be483259a670025e3023947399aebf0af
router.get('/listAll', budget.listAll);

router.delete('/deletebudget', budget.deleteBudget);
router.post('/deleteousbudget', budget.deleteSousBudget);
router.get('/listBudgets', budget.FindByName);


module.exports = router;