//Importando Models
const Registro = require('../models/Registro');
const Indicador = require('../models/Indicador');
const Periodo = require('../models/Periodo');

//Importando Funções
const preparaRegistros = require('../functions/preparaRegistrosAPI');
const preparaIndicadores = require('../functions/preparaIndicadoresAPI');
const preparaPeriodos = require('../functions/preparaPeriodosAPI');

//Rota Padrão da API
exports.getDados = async (req, res)=> {
    const dataRegistro = await Registro.find({}).sort({oe_id: "asc"});
    const dataIndicador = await Indicador.find({}).sort({indicador_id: "asc", "fonte.fonte_id": "asc"});
    const dataPeriodo = await Periodo.find({}).sort({ano: "asc"});
    try {
        //Formatando a exibição de Registros, Indicadores e Períodos
        let registros = preparaRegistros(dataRegistro);
        let indicadores = preparaIndicadores(dataIndicador);
        let periodos = preparaPeriodos(dataPeriodo);
        //Inserindo os Indicadores corretos em cada Registro, e os Períodos em cada indicador
        periodos.forEach(periodo => {
            indicadores.forEach(indicador => {
                if(periodo.indicador_origem == indicador.indicador_id) {
                    delete(periodo.indicador_origem);
                    delete(periodo._id);
                    indicador.periodo.push(periodo);
                }
                registros.forEach(registro => {
                    delete(registro._id);
                    if(indicador.oe_origem == registro.oe_id) {
                        delete(indicador.oe_origem);
                        delete(indicador._id);
                        registro.indicadores.push(indicador);
                    } 
                })
            })
        })
        res.send({dados: registros});

    }catch(err) {
        res.send(`Erro: ${err}`);
    }
}

//Retorna registros na API de acordo com o OE passado no parâmetro
exports.getDadosOE = async (req, res)=> {
    let oe_id = req.params.oe_id;
    const dataRegistro = await Registro.find({oe_id});
    const dataIndicador = await Indicador.find({}).sort({indicador_id: "asc"});
    const dataPeriodo = await Periodo.find({}).sort({ano: "asc"});
    try {
        //Formatando a exibição de Registros, Indicadores e Períodos
        let registros = preparaRegistros(dataRegistro);
        let indicadores = preparaIndicadores(dataIndicador);
        let periodos = preparaPeriodos(dataPeriodo);
        //Inserindo os Indicadores corretos em cada Registro, e os Períodos em cada indicador
        periodos.forEach(periodo => {
            indicadores.forEach(indicador => {
                if(periodo.indicador_origem == indicador.indicador_id) {
                    delete(periodo.indicador_origem);
                    delete(periodo._id);
                    indicador.periodo.push(periodo);
                }
                registros.forEach(registro => {
                    if(indicador.oe_origem == registro.oe_id) {
                        delete(indicador.oe_origem);
                        delete(indicador._id);
                        registro.indicadores.push(indicador);
                    } 
                })
            })
        })
        res.send({dados: registros});

    }catch(err) {
        res.send(`Erro ao deletar registro: ${err}`);
    }
}