//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Indicador = require('../models/Indicador');
const Periodo = require('../models/Periodo');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistrosAPI');
const preparaIndicadores = require('../functions/preparaIndicadoresAPI');
const preparaPeriodos = require('../functions/preparaPeriodosAPI');
//Importando Middleware
const auth = require('../middlewares/auth');

//Monstrando todos os registros
router.get('/', auth, async (req, res)=> {
    const dataRegistro = await Registro.find({}).sort({oe_id: "asc"});
    const dataIndicador = await Indicador.find({}).sort({indicador_id: "asc", "fonte.fonte_id": "asc"});
    const dataPeriodo = await Periodo.find({});
    try {
        //Formatando a exibição de Registros, Indicadores e Períodos
        let registros = preparaRegistros(dataRegistro);
        let indicadores = preparaIndicadores(dataIndicador);
        let periodos = preparaPeriodos(dataPeriodo);
        //Inserindo os Indicadores corretos em cada Registro, e os Períodos em cada indicador
        periodos.forEach(periodo => {
            console.log(periodo)
            indicadores.forEach(indicador => {
                if(periodo.indicador_origem == indicador.indicador_id) {
                    delete(periodo.indicador_origem);
                    indicador.periodo.push(periodo);
                }
                registros.forEach(registro => {
                    if(indicador.oe_origem == registro.oe_id) {
                        delete(indicador.oe_origem);
                        registro.indicadores.push(indicador);
                    } 
                })
            })
        })
        res.send({dados: registros});

    }catch(err) {
        res.send(`Erro: ${err}`);
    }
})

//Mostrando registros listados por OE
router.get('/:oe_id', auth, async (req, res)=> {
    let oe_id = req.params.oe_id;
    const dataRegistro = await Registro.find({oe_id});
    const dataIndicador = await Indicador.find({}).sort({indicador_id: "asc", "fonte.fonte_id": "asc"});
    const dataPeriodo = await Periodo.find({});
    try {
        //Formatando a exibição de Registros, Indicadores e Períodos
        let registros = preparaRegistros(dataRegistro);
        let indicadores = preparaIndicadores(dataIndicador);
        let periodos = preparaPeriodos(dataPeriodo);
        //Inserindo os Indicadores corretos em cada Registro, e os Períodos em cada indicador
        periodos.forEach(periodo => {
            console.log(periodo)
            indicadores.forEach(indicador => {
                if(periodo.indicador_origem == indicador.indicador_id) {
                    delete(periodo.indicador_origem);
                    indicador.periodo.push(periodo);
                }
                registros.forEach(registro => {
                    if(indicador.oe_origem == registro.oe_id) {
                        delete(indicador.oe_origem);
                        registro.indicadores.push(indicador);
                    } 
                })
            })
        })
        res.send({dados: registros});

    }catch(err) {
        console.log(`Erro ao deletar registro: ${err}`);
    }
})
 

module.exports = router;