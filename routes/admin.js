//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');

//Rota geral Admin
router.get('/', (req, res)=> {
    res.render('admin.handlebars');
})

//Página para cadastro de informações
router.get('/cadastro', (req, res)=> {
    res.render('cadastro.handlebars');
})

//Página para visualização de informações cadastradas
router.get('/registros', async (req, res)=> {
    try{
        
 
    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
    
})

//Rota POST que insere as informações no BD
router.post('/cadastro', async (req, res)=> {
    let { oe, periodo, dado, fonte, indicador } = req.body;
    
    try {
        

    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

module.exports = router;