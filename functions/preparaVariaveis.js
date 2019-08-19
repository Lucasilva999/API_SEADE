//Função que prepara as Variáveis no formato ideal para serem enviadas
function preparaVariaveis(data) {
    let array = [];
    data.forEach(variavel => {
        let json = {
            _id: variavel._id,
            oe_origem: variavel.oe_origem,
            indicador: variavel.indicador,
            fonte: variavel.fonte,
            periodo: {
                ano: variavel.periodo.ano,
                valor: variavel.periodo.valor
            }
        }
        array.push(json);
        
    })
    return array;
}

module.exports = preparaVariaveis;