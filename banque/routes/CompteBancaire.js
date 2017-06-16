/**
 * Created by med on 16-Jun-17.
 */
/**
 * Created by med on 16-Jun-17.
 */
var express = require('express');
var router = express.Router();
var banque = require('../controllers/CompteBancaire');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/ajoutercompte', banque.addCompte);
router.post('/supprimercompte', banque.deleteCompte);
router.get('/listecompte', banque.listAll);

module.exports = router;