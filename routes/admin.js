//Importanto Express Router e Models
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistros');
const preparaVariaveis = require('../functions/preparaVariaveis');
const defineOE = require('../functions/defineOE');
const preparaDadosExcel = require('../functions/preparaDadosExcel');
const insereDadosExcel = require('../functions/insereDadosExcel');
const criarTokenUsuario = require('../functions/criarTokenUsuario');
//Importando Middleware
const auth = require('../middlewares/auth');

//Rota geral Admin
router.get('/', (req, res)=> {
    let user = {user: 'Lucas', email: 'email@email.com', password: '123'};
    let token = criarTokenUsuario(user);
    //console.log(token);
    res.render('admin.handlebars');
})

//Página para cadastro de informações
router.get('/cadastro', auth, (req, res)=> {
    res.render('cadastro.handlebars');
})

//Página de Cadastro de Informações pelo Excel
router.get('/cadastro-excel', auth, (req, res)=> {
    res.render('cadastroPlanilha.handlebars');
})

//Rota POST para inserir as informações no BD
router.post('/cadastro-excel', auth, async (req, res)=> {
    let txt = req.body.txtArea;
    txt = preparaDadosExcel(txt);

    try {
        insereDadosExcel(txt);
        setTimeout(()=> {
            res.redirect('/dados');
        }, 1000);

    } catch(err) {
        console.log(`Erro: ${err}`);
    }
})

//Página para visualização de informações cadastradas
router.get('/registros', auth, async (req, res)=> {
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
        res.render('registros.handlebars', {registros});
 
    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

//Rota POST que insere as informações no BD
router.post('/cadastro', auth, async (req, res)=> {
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

//Rota para deletar Registros
router.get('/delete/registro/:id', auth, async (req, res) => {
    try{
        //Exclui o Registro do BD
        const registro = await Registro.findOne({"_id": req.params.id});
        await Registro.deleteOne({"_id": req.params.id});
        //Exclui cada uma da Variaveis atribuídas a esse Registro
        registro.variaveis.forEach(async variavel => {
            await Variavel.deleteOne({"_id": variavel});
        })
        res.redirect('/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Rota para deletar Variáveis
router.get('/delete/variavel/:id', auth, async (req, res) => {
    try{
        const registros = await Registro.find({});
        const variavel = await Variavel.findOne({"_id": req.params.id});
        let idVariavel = variavel._id.toString();

        registros.forEach(registro => {
            registro.variaveis.forEach(async variavel => {
                //Procurando no array do Registro pela variável correspondente
                if(variavel == idVariavel) {
                    //Excluindo o ID da Váriavel armazenada no array do Registro
                    await Registro.findOneAndUpdate({variaveis: idVariavel}, 
                    {$pull: {variaveis: variavel}}, {new: true});
                }
            })
        })
        //Deletando a Variável correspondente
        await Variavel.deleteOne({"_id": req.params.id});
        res.redirect('/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Rota Para Editar Variáveis
router.post('/update', auth, async (req, res)=> {
    let { _id, ano, valor, fonte, indicador } = req.body;
    
    try {
        const variavel = await Variavel.findOne({_id});
        variavel.indicador = indicador;
        variavel.fonte = fonte;
        variavel.periodo.ano = ano;
        variavel.periodo.valor = valor;
        await variavel.save();
        res.redirect('/registros');

    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

module.exports = router;