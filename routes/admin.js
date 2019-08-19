//Importanto Express Router e Models
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistros');
const preparaVariaveis = require('../functions/preparaVariaveis');
const defineOE = require('../functions/defineOE');

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
        const dataRegistro = await Registro.find({}).sort({oe_num: "asc"});
        const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc", "periodo.valor": "asc"});
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


module.exports = router;