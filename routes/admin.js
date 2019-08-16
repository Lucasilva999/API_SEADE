//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Periodo = require('../models/Periodo');

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
        const registros = await Registro.find({}).sort({oe: "asc"}).then(registros => {
            res.render('registros.handlebars', {registros});
        })
 
    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
    
})

//Rota POST que insere as informações no BD
router.post('/cadastro', async (req, res)=> {
    let { oe_num, periodo, dado, fonte, indicador } = req.body;
    let oe =  defineOE(oe_num);
    

    try {
        let find = await Registro.find({oe_num});
        if(find[0]) {
            //Caso OE já esteja cadastrado
            console.log('Já cadastrado');
            /*let periodos = await Periodo.create({periodo, dado});
            Registro.findOneAndUpdate({oe_num}, {$push: periodos._id});
            res.render('cadastro.handlebars');
            console.log(periodos);*/
        }else {
            //Caso OE ainda não tenha sido cadastrado
            console.log('Não cadastrado');
            /*let periodos = await Periodo.create({periodo, dado});
            await Registro.create({ oe_num, oe, indicador, fonte, periodos });
            res.render('cadastro.handlebars');*/
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