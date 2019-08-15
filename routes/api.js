//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const data = await Registro.find({});
    try {
        let json = preparaJSON(data);
        res.send({indicadores: json});

    }catch(err) {
        console.log(`Erro: ${err}`);
    }
})

//Rota para deletar registros
router.get('/delete/:id', async (req, res) => {
    try{
        await Registro.deleteOne({"_id": req.params.id});
        res.redirect('/admin/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Mostrando registros listados por OE
router.get('/:oe', async (req, res)=> {
    let oe = req.params.oe;
    const data = await Registro.find({oe});
    let json = preparaJSON(data);
    res.send({indicadores: json});
})

//Mostrando registros listados por OE/Período
router.get('/:oe/:periodo', async (req, res)=> {
    let { oe, periodo } = req.params;
    const data = await Registro.find({oe, periodo});
    let json = preparaJSON(data);
    res.send({indicadores: json});
})


//Função que prepara o JSON no formato para ser enviado
function preparaJSON(data) {
    let array = [];
        data.forEach(indicador => {
            let json = {
                oe: indicador.oe,
                nome: indicador.indicador,
                fonte: indicador.fonte,
                periodos: {
                    ano: indicador.periodo,
                    valor: indicador.dado
                }
            }
            array.push(json);  
    })
    return array;
}

module.exports = router;