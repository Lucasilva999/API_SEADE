//Função que prepara os Períodos no formato para ser enviado
function preparaPeriodos(data) {
    let array = [];
    data.forEach(periodo => {
        let json = {
            _id: periodo._id,
            indicador_origem: periodo.indicador_origem,
            ano: periodo.ano,
            valor: periodo.valor
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaPeriodos;