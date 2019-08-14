//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const data = await Registro.find({});
    res.send(data);
})

//Mostrando registros listados por OE
router.get('/:oe', async (req, res)=> {
    let oe = req.params.oe;
    const data = await Registro.find({oe});
    res.send(data);
})

//Mostrando registros listados por OE/Período
router.get('/:oe/:periodo', async (req, res)=> {
    let oe = req.params.oe;
    let periodo = req.params.periodo;
    const data = await Registro.find({oe, periodo});
    res.send(data);
})

module.exports = router;