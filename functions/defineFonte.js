//Define o campo fonte_nome com base no valor de fonte_id recebido no formulário
function defineFonte(fonte_id) {
    let fonte = '';
    switch (fonte_id) {
        case '1':
            fonte = 'Instituto Brasileiro de Geografia e Estatística – IBGE, Fundação Seade';
            break;
        case '3':
            fonte = 'Datasus';
            break;
        case '4':
            fonte = 'Fundação SEADE';
            break;
        case '5':
            fonte = 'Ministério da Economia, Indústria, Comércio Exterior - MDIC; Fundação SEADE.';
            break;
        case '6': 
            fonte = 'IBGE/PNAD/PNAD Contínua. Fundação Seade.';
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
            fonte = 'Secretaria do Meio Ambiente - SMA';
            break;
        case '14': 
            fonte = 'Secretaria Estadual de Energia';
            break;
        default:
            fonte = 'Oops, algo de errado aconteceu na inserção...';
            break;
    }
    return fonte;
}

module.exports = defineFonte;