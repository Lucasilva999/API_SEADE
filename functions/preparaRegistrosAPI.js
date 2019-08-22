//Função que prepara os Registros no formato para ser enviado
function preparaRegistros(data) {
    let array = [];
    data.forEach(registro => {
        let json = {
            _id: registro._id,
            oe_id: registro.oe_id,
            oe_desc: registro.oe_desc,
            indicadores: []
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaRegistros;