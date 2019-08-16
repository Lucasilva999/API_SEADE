//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');

//Rota geral Admin
router.get('/', (req, res)=> {
    res.render('admin.handlebars');
})

//Página para cadastro de informações
router.get('/cadastro', (req, res)=> {
    res.render('cadastro.handlebars');
})

//Página para visualização de informações cadastradas
router.get('/registros', async (req, res)=> {
    try{
        await Registro.find({}).sort({oe: "asc"}).then(registros => {
        res.render('registros.handlebars', {registros});
    })
 
    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
    
})

//Rota POST que insere as informações no BD
router.post('/cadastro', async (req, res)=> {
    let { oe_num, ano, valor, fonte, indicador } = req.body;
    let oe =  defineOE(oe_num);
    

    try {
        let find = await Registro.find({oe_num});
        if(find[0]) {
            //Caso OE já esteja cadastrado
            let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
            await Registro.findOneAndUpdate({oe_num}, {$push: {variaveis}}, {new: true});
            res.render('cadastro.handlebars');
        }else {
            //Caso OE ainda não tenha sido cadastrado
            let variaveis = await Variavel.create({oe_origem: oe_num, indicador, fonte, periodo:{ano, valor}});
            await Registro.create({ oe_num, oe, variaveis });
            res.render('cadastro.handlebars');
        }

    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

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
    }
    return oe;
}

module.exports = router;