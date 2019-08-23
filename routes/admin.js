//Importanto Express Router e Models
const router = require('express').Router();
const Registro = require('../models/Registro');
const Indicador = require('../models/Indicador');
const Periodo = require('../models/Periodo');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistrosAPI');
const preparaIndicadores = require('../functions/preparaIndicadoresAPI');
const preparaPeriodos = require('../functions/preparaPeriodosAPI');
const defineOE = require('../functions/defineOE');
const defineFonte = require('../functions/defineFonte');
const defineIndicador = require('../functions/defineIndicador');
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
        const dataRegistro = await Registro.find({}).sort({oe_id: "asc"});
        const dataIndicador = await Indicador.find({}).sort({indicador_id: "asc", "fonte.fonte_id": "asc"});
        const dataPeriodo = await Periodo.find({}).sort({ano: "asc"});

         //Formatando a exibição de Registros, Indicadores e Períodos
         let registros = preparaRegistros(dataRegistro);
         let indicadores = preparaIndicadores(dataIndicador);
         let periodos = preparaPeriodos(dataPeriodo);
         //Inserindo os Indicadores corretos em cada Registro, e os Períodos em cada indicador
         periodos.forEach(periodo => {
             indicadores.forEach(indicador => {
                 if(periodo.indicador_origem == indicador.indicador_id) {
                     delete(periodo.indicador_origem);
                     indicador.periodo.push(periodo);
                 }
                 registros.forEach(registro => {
                     if(indicador.oe_origem == registro.oe_id) {
                         delete(indicador.oe_origem);
                         registro.indicadores.push(indicador);
                     } 
                 })
             })
         })
         
         res.render('registros.handlebars', {registros});
 
    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

//Rota POST que insere as informações no BD
router.post('/cadastro', auth, async (req, res)=> {
    let { oe_id, ano, valor, fonte_id, indicador_id } = req.body;
    let oe_desc =  defineOE(oe_id);
    let fonte_nome = defineFonte(fonte_id);
    let indicador_nome = defineIndicador(indicador_id);
    
    try {
        let findOE = await Registro.find({oe_id});
        let findIndicador = await Indicador.find({indicador_id});
        if(findOE[0]) {
            //Caso OE já esteja cadastrado
            if(findIndicador[0]) {
                //Caso Indicador já esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                await Indicador.findOneAndUpdate({indicador_id}, {$push: {periodo}}, {new: true});
                res.render('cadastro.handlebars');
            } else {
                //Caso Indicador não esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.create({"oe_origem": oe_id, indicador_id, indicador_nome, fonte: {fonte_id, fonte_nome}, periodo});
                await Registro.findOneAndUpdate({oe_id}, {$push: {indicadores}}, {new: true});
                res.render('cadastro.handlebars');
            }
        }else {
            //Caso OE ainda não tenha sido cadastrado
            if(findIndicador[0]) {
                //Caso Indicador já esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.findOneAndUpdate({indicador_id}, {$push: {periodo}}, {new: true});
                await Registro.create({ oe_id, oe_desc, indicadores });
                res.render('cadastro.handlebars');
            } else {
                //Caso Indicador não esteja cadastrado
                let periodo = await Periodo.create({"indicador_origem": indicador_id, ano, valor});
                let indicadores = await Indicador.create({"oe_origem": oe_id, indicador_id, indicador_nome, fonte: {fonte_id, fonte_nome}, periodo});
                await Registro.create({ oe_id, oe_desc, indicadores });
                res.render('cadastro.handlebars');
            }
        }

    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

//Rota para deletar Registros
router.get('/delete/registro/:id', auth, async (req, res) => {
    try{

        const registro = await Registro.findOne({"_id": req.params.id});
        
        registro.indicadores.forEach(async idIndicador => {
            indicadores = await Indicador.find({"_id": idIndicador});
            indicadores.forEach(async indicador => {
                //Deleta Cada um dos Períodos associados aos Indicadores do Registro
                indicador.periodo.forEach( async idPeriodo => {
                    await Periodo.deleteOne({"_id": idPeriodo});
                })
                //Deleta Cada um dos Indicadores associados ao Regeistro
                await Indicador.deleteOne({"_id": indicador});
            })
        })
        //Deleta o Registro
        await Registro.deleteOne({"_id": req.params.id});

        res.redirect('/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Rota para deletar Indicadores
router.get('/delete/indicador/:id', auth, async (req, res) => {
    try{
        const registros = await Registro.find({});
        const indicador = await Indicador.findOne({"_id": req.params.id});
        const periodos = await Periodo.find({});
        let idIndicador = indicador._id.toString();

        registros.forEach(registro => {
            registro.indicadores.forEach(async indicador => {
                //Procurando no array do Registro pelo Indicador correspondente
                if(indicador == idIndicador) {
                    //Excluindo o ID do Indicador armazenado no array do Registro
                    await Registro.findOneAndUpdate({indicadores: idIndicador}, 
                    {$pull: {indicadores: indicador}}, {new: true});
                }
            })
            //Excluindo todos os Períodos correpsondentes ao Indicador
            indicador.periodo.forEach(idPeriodo => {
                periodos.forEach(async periodo => {
                    if(idPeriodo.toString() == periodo._id) {
                        await Periodo.deleteOne({"_id": idPeriodo});
                    }
                })
            })

        })
        //Deletando o Indicador correspondente
        await Indicador.deleteOne({"_id": req.params.id});
        res.redirect('/registros');
        
    }catch(err){
        res.send(`Erro ao deletar registro: ${err}`);
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