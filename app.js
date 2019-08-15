//Importando Dependências
const express = require('express');
const Sequelize = require('sequelize');
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

    //Conexão com o MySQL
    let { DATABASE, USER, PASSWORD } = process.env
    let sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
       host: 'localhost', 
       dialect: 'mysql'
    });

    let conexao = async ()=> {
      await sequelize.authenticate();
      console.log('Conectado ao Banco de Dados...');
   }

    try {
      conexao();

    }catch(err) {
      console.log(`Erro ao se conectar ao BD: ${err}`);

    }
    

     //Importando Rotas
     const routeApi = require('./routes/api.js');
     const routeAdmin = require('./routes/admin');

     //Usando rotas
     app.use('/api', routeApi);
     app.use('/admin', routeAdmin);
     

app.listen(porta, ()=> console.log(`Escutando na porta ${porta}...`));
