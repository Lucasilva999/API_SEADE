const Registro = require('../models/Registro');
const Indicador = require('../models/Indicador');
const Periodo = require('../models/Periodo');

const defineOE = require('../functions/defineOE');
const defineIndicador = require('../functions/defineIndicador');
const defineFonte = require('../functions/defineFonte');


//Insere no Banco de Dados os dados recebidos no Array de Objetos passado no Parâmetro 
async function insereDadosExcel(data) {
    
    for(i = 0; i < data.length; i++) {
        let { oe_id, indicador_id, fonte_id, ano, valor, nota } = data[i];
        let oe_desc = defineOE(oe_id.toString());
        let indicador_nome = defineIndicador(indicador_id.toString());
        let fonte_nome = defineFonte(fonte_id.toString());
        if(!nota) nota = null;
         
        let findOE = await Registro.find({oe_id});
        let findIndicador = await Indicador.find({indicador_id});
        if(findOE[0]) {
            //Caso OE já esteja cadastrado
            if(findIndicador[0]) {
                //Caso Indicador já esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                await Indicador.findOneAndUpdate({indicador_id}, {$push: {periodo}}, {new: true});

            } else {
                //Caso Indicador não esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.create({"oe_origem": oe_id, indicador_id, indicador_nome, fonte: {fonte_id, fonte_nome, nota}, periodo});
                await Registro.findOneAndUpdate({oe_id}, {$push: {indicadores}}, {new: true});
        
            }
        }else {
            //Caso OE ainda não tenha sido cadastrado
            if(findIndicador[0]) {
                //Caso Indicador já esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.findOneAndUpdate({indicador_id}, {$push: {periodo}}, {new: true});
                await Registro.create({ oe_id, oe_desc, indicadores });
            
            } else {
                //Caso Indicador não esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.create({"oe_origem": oe_id, indicador_id, indicador_nome, fonte: {fonte_id, fonte_nome, nota}, periodo});
                await Registro.create({ oe_id, oe_desc, indicadores });
                
            }
            
        }
    }
}

module.exports = insereDadosExcel;