//Importando Dependências
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const app = express();
const dotenv = require('dotenv');

//Config
    //DotEnv
    dotenv.config();
    //Definindo Porta
    const porta = process.env.PORTA || 5000;
    
    //Express BodyParser
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    //Conexão com o MongoDB
    mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false})
    .then(()=> console.log('Conectado ao Banco de Dados...'))
    .catch(err => console.log(`Erro ao se conectar ao Banco de Dados: ${err}`))

     //Importando Rotas
     const routeApi = require('./routes/api.js');
     const routeAdmin = require('./routes/admin');

     //Usando rotas
     app.use('/api', routeApi);
     app.use('/admin', routeAdmin);
     

app.listen(porta, ()=> console.log(`Escutando na porta ${porta}...`));
