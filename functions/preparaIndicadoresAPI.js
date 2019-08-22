//Função que prepara as Variáveis no formato ideal para serem enviadas
function preparaVariaveis(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            oe_origem: indicador.oe_origem,
            indicador: indicador.indicador,
            fonte: indicador.fonte,
            periodo: {
                ano: indicador.periodo.ano,
                valor: indicador.periodo.valor
            }
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaVariaveis;