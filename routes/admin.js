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

/*
.then(res.render('registros.handlebars', {variavel, registro}))
*/

//Página para visualização de informações cadastradas
router.get('/registros', async (req, res)=> {
    try{
        const dataRegistro = await Registro.find({}).sort({oe_num: "asc"});
        const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc"});
        //Formatando a exibição de Registros e Variáveis
        let registros = preparaRegistros(dataRegistro);
        let variaveis = preparaVariaveis(dataVariavel);
        //Inserindo as Variáveis corretas em cada Registro para a exibição
        variaveis.forEach(variavel => {
            registros.forEach(registro => {
                if(variavel.oe_origem == registro.oe_num) {
                    delete(variavel.oe_origem);
                    registro.variaveis.push(variavel);
                }
            })
        })
        res.render('registros.handlebars', {registros})
 
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

//Função que prepara os Registros no formato para ser enviado
function preparaRegistros(data) {
    let array = [];
    data.forEach(indicador => {
        let json = {
            oe_num: indicador.oe_num,
            oe: indicador.oe,
            variaveis: []
        }
        array.push(json);
        
    })
    return array;
}

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

module.exports = router;