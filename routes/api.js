//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistrosAPI');
const preparaVariaveis = require('../functions/preparaVariaveisAPI');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const dataRegistro = await Registro.find({}).sort({oe_num: "asc"});
    const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc", "periodo.valor": "asc"});
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

//Mostrando registros listados por OE
router.get('/:oe_num', async (req, res)=> {
    let oe_num = req.params.oe_num;
    const dataRegistro = await Registro.find({oe_num});
    const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc", "periodo.valor": "asc"});
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
        console.log(`Erro ao deletar registro: ${err}`);
    }
})


module.exports = router;