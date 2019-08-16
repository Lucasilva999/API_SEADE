//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const data = await Registro.find({}).sort({oe_num: 'asc'});
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
        //Exclui o Registro do BD
        const registro = await Registro.findOne({"_id": req.params.id});
        await Registro.deleteOne({"_id": req.params.id});
        //Exclui cada uma da Variaveis atribuídas a esse Registro
        registro.variaveis.forEach(async variavel => {
            await Variavel.deleteOne({"_id": variavel});
        })
        
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
async function preparaJSON(data) {
    /*
    let array = [];
        const promises = await data.forEach(indicador => {
            let json = {
                oe_num: indicador.oe_num,
                oe: indicador.oe,
                variaveis: [
                
                ]
            }
            let atribuiVariaveis = async function() {
                let varArray = [];
                for(let i = 0; i < indicador.variaveis.length; i++) {
                    let item = await Variavel.findOne({"_id": indicador.variaveis[i]});
                    varArray.push(item);
                }
                //console.log(varArray);
                return varArray;
            }

            json.variaveis = atribuiVariaveis();
            array.push(json);  
    })
    await Promise.all(promises);
    return array; */
}

module.exports = router;