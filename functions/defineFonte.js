//Define o campo fonte_nome com base no valor de fonte_id recebido no formulário
function defineFonte(fonte_id) {
    let fonte = '';
    switch (fonte_id) {
        case '1':
            fonte = 'Instituto Brasileiro de Geografia e Estatística – IBGE, Fundação Seade';
            break;
        case '2': 
            fonte = 'Instituto Brasileiro de Geografia e Estatística – IBGE, Fundação Seade. Nota: Os dados são preliminares e sujeitos a revisão';
            break;
        case '3':
            fonte = 'Datasus';
            break;
        case '4':
            fonte = 'Fundação SEADE';
            break;
        case '5':
            fonte = 'http://www.mdic.gov.br/comercio-exterior/estatisticas-de-comercio-exterior/comex-vis/frame-siit';
            break;
        case '6': 
            fonte = 'IBGE/PNAD Contínua. Fundação Seade';
            break;
        case '7':
            fonte = 'IBGE/PNAD. Fundação SEADE';
            break;
        case '8': 
            fonte = 'MEC/Inep, Censo Escolar';
            break;
        case '9':
            fonte = 'MEC/INEP';
            break;
        case '10':
            fonte = 'Ministério do Trabalho e Emprego – MTE. Relação Anual de Informações Sociais – Rais. Fundação Seade';
            break;
        case '11':
            fonte = 'Secretaria da Segurança Pública do Estado de São Paulo';
            break;
        case '12': 
            fonte = 'Qualidade de vida urbana, com moradia adequada e mobilidade';
            break;
        case '13': 
            fonte = 'Secretaria do Meio Ambiente - SMA – Relatório de Qualidade Ambiental - 2018';
            break;
        case '14': 
            fonte = 'Secretaria Estadual de Energia';
            break;
        case '15': 
            fonte = 'Secretaria Estadual de Energia. Balanço Energético do Estado de São Paulo - Ano Base 2016';
            break;
        case '16': 
            fonte = 'Secretaria Estadual de Energia. Balanço Energético do Estado de São Paulo - Ano Base 2017';
            break;
    }
    return fonte;
}

module.exports = defineFonte;