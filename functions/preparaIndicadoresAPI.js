//Função que prepara os Indicadores no formato ideal para serem enviadas
function preparaIndicadores(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            _id: indicador._id,
            oe_origem: indicador.oe_origem,
            indicador_id: indicador.indicador_id,
            indicador_nome: indicador.indicador_nome,
            fonte: {
                fonte_id: indicador.fonte.fonte_id,
                fonte_nome: indicador.fonte.fonte_nome,
                nota: indicador.fonte.nota
            },
            periodo: []
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaIndicadores;