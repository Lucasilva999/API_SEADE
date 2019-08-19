//Função que prepara os Registros no formato para ser enviado
function preparaRegistros(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            _id: indicador._id,
            oe_num: indicador.oe_num,
            oe: indicador.oe,
            variaveis: []
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaRegistros;