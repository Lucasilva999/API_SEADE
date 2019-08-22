//Função que prepara os Registros no formato para ser enviado
function preparaRegistros(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            oe_id: indicador.oe_id,
            oe_desc: indicador.oe_desc,
            indicadores: []
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaRegistros;