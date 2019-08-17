//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const dataRegistro = await Registro.find({}).sort({oe_num: 'asc'});
    const dataVariavel = await Variavel.find({}).sort({oe_origem: 'asc'});
    try {
        //Formatando a exibição de Registros e Variáveis
        let registros = preparaRegistros(dataRegistro);
        let variaveis = preparaVariaveis(dataVariavel);
        //Inserindo as Variáveis corretas em cada Registro para a exibição
        variaveis.forEach(variavel => {
            registros.forEach(registro => {
                if(variavel.oe_origem == registro.oe_num) {
                    delete(variavel.oe_origem);
                    registro.variaveis.push(variavel);
                }
            })
        }); 
        res.send({indicadores: registros});

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


//Função que prepara os Registros no formato para ser enviado
function preparaRegistros(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            oe_num: indicador.oe_num,
            oe: indicador.oe,
            variaveis: []
        }
        array.push(json);
        
    })
    return array;
}

//Função que prepara as Variáveis no formato ideal para serem enviadas
function preparaVariaveis(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            oe_origem: indicador.oe_origem,
            indicador: indicador.indicador,
            fonte: indicador.fonte,
            periodo: {
                ano: indicador.periodo.ano,
                valor: indicador.periodo.valor
            }
        }
        array.push(json);
        
    })
    return array;
}

module.exports = router;