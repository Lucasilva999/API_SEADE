const Registro = require('../models/Registro');
const Indicador = require('../models/Indicador');

const defineOE = require('../functions/defineOE');
const defineIndicador = require('../functions/defineIndicador');
const defineFonte = require('../functions/defineFonte');


//Insere no Banco de Dados os dados recebidos no Array de Objetos passado no Parâmetro 
async function insereDadosExcel(data) {
    
    console.log(data);
    
    for(i = 0; i < data.length; i++) {
        let { oe_num, indicador_id, fonte_id, ano, valor } = data[i];
        let oe_desc = defineOE(oe_num);
        let indicador_nome = defineIndicador(indicador_id);
        let fonte_nome = defineOE(fonte_id);;

        //let registro = await Registro.findOne({oe_num});

        //Caso OE já esteja cadastrado 
        /*if(registro != null && registro != undefined && registro != false &&
            registro != []) { 
            let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
            await Registro.findOneAndUpdate({oe_num}, {$push: {variaveis}}, {new: true});

        } else {

        //Caso OE ainda não tenha sido cadastrado
        let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
        await Registro.create({ oe_num, oe, variaveis });
        }*/
    }
    
}

module.exports = insereDadosExcel;