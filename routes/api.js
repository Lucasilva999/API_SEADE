//Importanto Express Router e Model Registro
const router = require('express').Router();
const Registro = require('../models/Registro');
const Variavel = require('../models/Variavel');
//Importando as Funções que serão utilizadas
const preparaRegistros = require('../functions/preparaRegistrosAPI');
const preparaVariaveis = require('../functions/preparaVariaveisAPI');

//Monstrando todos os registros
router.get('/', async (req, res)=> {
    const dataRegistro = await Registro.find({}).sort({oe_num: "asc"});
    const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc", "periodo.valor": "asc"});
    try {
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
        }); 
        res.send({indicadores: registros});

    }catch(err) {
        console.log(`Erro: ${err}`);
    }
})

//Rota para deletar Registros
router.get('/delete/registro/:id', async (req, res) => {
    try{
        //Exclui o Registro do BD
        const registro = await Registro.findOne({"_id": req.params.id});
        await Registro.deleteOne({"_id": req.params.id});
        //Exclui cada uma da Variaveis atribuídas a esse Registro
        registro.variaveis.forEach(async variavel => {
            await Variavel.deleteOne({"_id": variavel});
        })

        res.redirect('/admin/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Rota para deletar Variáveis
router.get('/delete/variavel/:id', async (req, res) => {
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
        res.redirect('/admin/registros');
        
    }catch(err){
        console.log(`Erro ao deletar registro: ${err}`);
    }
})

//Rota Para Editar Variáveis
router.post('/update', async (req, res)=> {
    let { _id, ano, valor, fonte, indicador } = req.body;
    
    try {
        const variavel = await Variavel.findOne({_id});
        variavel.indicador = indicador;
        variavel.fonte = fonte;
        variavel.periodo.ano = ano;
        variavel.periodo.valor = valor;
        await variavel.save();
        res.redirect('/admin/registros');

    }catch(err) {
        res.send(`<p>Erro: ${err}</p>`);
    }
})

//Mostrando registros listados por OE
router.get('/:oe_num', async (req, res)=> {
    let oe_num = req.params.oe_num;
    const dataRegistro = await Registro.find({oe_num});
    const dataVariavel = await Variavel.find({}).sort({"periodo.ano": "asc", "periodo.valor": "asc"});
    try {
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
        }); 
        res.send({indicadores: registros});

    }catch(err) {
        console.log(`Erro ao deletar registro: ${err}`);
    }
})


module.exports = router;