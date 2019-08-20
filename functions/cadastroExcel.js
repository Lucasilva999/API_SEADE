const defineOE = require('./defineOE');

function cadastroExcel(txt) {
    let array = [];
    txt = txt.replace(/(\r\n|\n|\r)/gm,";");
    txt = txt.replace(/\t+/g,";");
    txt = txt.split(';');
    for(let i = 0; i < txt.length;) {
        let oe_num = txt[i]; i++;
        let oe = defineOE(oe_num);
        let indicador = txt[i]; i++;
        let ano = txt[i]; i++;
        let valor = txt[i]; i++;
        let fonte = txt[i]; i++;

        let json = {
            oe_num,
            oe,
            indicador,
            ano,
            valor,
            fonte
        }
        
        if(json.oe_num && json.oe && json.indicador && json.ano && json.valor && json.fonte) {
            array.push(json);
        }
    }
    return array;
}

module.exports = cadastroExcel;