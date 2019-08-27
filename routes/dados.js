//Importanto Express Router e Model Registro
const router = require('express').Router();

//Importando Middleware
const auth = require('../middlewares/auth');

//Importando Controller
const dadosController = require('../controllers/dados');

//Monstrando todos os registros
router.get('/', auth, dadosController.getDados);

//Mostrando registros listados por OE
router.get('/:oe_id', auth, dadosController.getDadosOE);
 

module.exports = router;