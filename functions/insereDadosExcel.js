const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');

//Insere no Banco de Dados os dados recebidos no Array de Objetos passado no Parâmetro 
async function insereDadosExcel(txt) {
    for(i = 0; i < txt.length; i++) {
        let { oe_num, oe, indicador, fonte, ano, valor } = txt[i];
        let registro = await Registro.findOne({oe_num});

        //Caso OE já esteja cadastrado 
        if(registro != null && registro != undefined && registro != false &&
            registro != []) { 
            let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
            await Registro.findOneAndUpdate({oe_num}, {$push: {variaveis}}, {new: true});

        } else {

        //Caso OE ainda não tenha sido cadastrado
        let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
        await Registro.create({ oe_num, oe, variaveis });
        }
    }
}

module.exports = insereDadosExcel;