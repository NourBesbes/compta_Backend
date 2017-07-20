/**
 * Created by nour on 6/20/17.
 */
var express = require('express');
var router = express.Router();
var budget = require('../controllers/budget');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addbudget/:id', budget.addBudget);
router.post('/addsousbudget/:id', budget.addSousBudget);
router.get('/listAll/:id', budget.listAll);

router.delete('/deletebudget/:id', budget.deleteBudget);
router.post('/deletesousbudget/:id', budget.deleteSousBudget);
router.get('/getbudget/:name', budget.FindByName);
router.put('/update/:id', budget.update);
router.get('/getSousBudget/:name',budget.FindByName);
router.get('/GetExerciceComptable/:id',budget.GetExerciceComptable);
router.post('/GetExerciceComptable/:id',budget.GetExerciceComptable);

module.exports = router;