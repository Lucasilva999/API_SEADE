//Define o campo OE com base no valor de oe_num recebido no formulário
function defineOE(oe_num) {
    let oe = '';
    switch (oe_num) {
        case '1':
            oe = 'Educação de qualidade, inclusiva e transformadora, buscando o desenvolvimento pleno';
            break;
        case '2': 
            oe = 'Saúde pública integrada, com modernas tecnologias e amplo acesso';
            break;
        case '3':
            oe = 'Segurança para a sociedade usando ferramentas de inteligência no combate à criminalidade';
            break;
        case '4':
            oe = 'Desenvolvimento econômico promovendo o investimento, a inovação, o turismo e a economia criativa';
            break;
        case '5':
            oe = 'Desenvolvimento social garantindo os direitos individuais e coletivos e promovendo a autonomia plena';
            break;
        case '6': 
            oe = 'Qualidade de vida urbana, com moradia adequada e mobilidade';
            break;
        case '8': 
            oe = 'Desenvolvimento sustentável preservando o meio ambiente e protegendo a população frente aos desastres naturais';
            break;
        default:
            oe = 'Oops, algo de errado aconteceu na inserção, remova o registro e o insira novamente...';
            break;
    }
    return oe;
}

module.exports = defineOE;