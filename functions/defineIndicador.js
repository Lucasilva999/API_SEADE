//Define o campo indicador_nome com base no valor de indicador_id recebido no formulário
function defineIndicador(indicador_id) {
    let indicador = '';
    switch (indicador_id) {
        case '1':
            indicador = 'IDEB – Ensino Fundamental (Rede Estadual) – Anos Finais';
            break;
        case '2': 
            indicador = 'IDEB – Ensino Médio (Rede Estadual)';
            break;
        case '3':
            indicador = 'População de 18 a 24 Anos que não trabalha e não Estuda na População nessa Faixa Etária (em %)';
            break;
        case '4':
            indicador = 'Matrículas em cursos profissionalizante, técnico e tecnológico na rede estadual sobre total de estudantes do ensino médio (em %)';
            break;
        case '5':
            indicador = 'Esperança de Vida ao Nascer da População Total (em anos)';
            break;
        case '6': 
            indicador = 'Expectativa de Vida aos 65 anos (em anos)';
            break;
        case '7': 
            indicador = 'Taxa de Mortalidade Precoce (População de 30 a 69 Anos) por Doenças Crônicas Não Transmissíveis (DCNT) (Por cem mil habitantes)';
            break;
        case '8': 
            indicador = 'Média de Dias de Permanência de Internação na rede pública estadual (em dias)';
            break;
        case '9': 
            indicador = 'Taxa de Homicídio Doloso (Por cem mil habitantes)';
            break;
        case '10': 
            indicador = 'Taxa de Roubo e Furto de Veículos (Por cem mil veículos)';
            break;
        case '11': 
            indicador = 'Taxa de Mortalidade por Acidentes de Transportes (por cem mil habitantes)';
            break;
        case '12': 
            indicador = 'Taxa de ocorrências contra o patrimônio (por cem mil habitantes)';
            break;
        case '13': 
            indicador = 'Índice de Volume do Produto Interno Bruto (PIB) (Base 2010 = 100)';
            break;
        case '14': 
            indicador = 'Estoque de Empregos Formais';
            break;
        case '15': 
            indicador = 'Exportações das Indústrias de Alta e Média-Alta Tecnologia (US$ bilhão FOB)';
            break;
        case '16': 
            indicador = 'Proporção de ocupados de 14 anos ou mais em situação de trabalho vulnerável';
            break;
        case '17': 
            indicador = 'Pessoas de 15 a 17 anos do 1º Quintil mais pobre de rendimento per capita que frequentam a escola';
            break;
        case '18': 
            indicador = 'Índice de Envelhecimento da População (em %)';
            break;
        case '19': 
            indicador = '% de domicílios com carências habitacionais (déficit + inadequação)';
            break;
        case '20': 
            indicador = '% de domicílios atendidos pela rede de esgotamento sanitário';
            break;
        case '21': 
            indicador = 'Intensidade de emissão de Dióxido de Carbono (CO2) em Relação ao Produto Interno Bruto (Em tCO2/milR$ de 2005)';
            break;
        case '22': 
            indicador = 'Participação do Consumo Final de Energia Renovável no Total do Consumo Final de Energia';
            break;
        case '23': 
            indicador = 'Índice de Qualidade da Água (IQA) (Soma dos percentuais de ótimo e bom)';
            break;
        case '24': 
            indicador = 'Óbitos de Acidentes Relacionadas a Desastres Naturais (óbitos mais pessoas desaparecidas)';
            break;
        default:
            indicador = 'Oops, algo de errado aconteceu na inserção...';
            break;
    }
    return indicador;
}

module.exports = defineIndicador;