const Sequelize = require('sequelize');

let { DATABASE, USER, PASSWORD } = process.env
    let sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
       host: 'localhost', 
       dialect: 'mysql'
    });

//Model com que as informações são salvas no BD
let Registro = sequelize.define('registros', {

    oe_num: Sequelize.INTEGER,
    oe: Sequelize.TEXT,
    indicador: Sequelize.TEXT,
    periodo: Sequelize.INTEGER,
    dado: Sequelize.DOUBLE,
    fonte: Sequelize.STRING
})

/*Registro.sync({force: true}).then(function () {
    // Table created
    return Registro.create({
      oe_num: 1,
      oe: 'Teste teste teste',
      indicador: 'Teste teste teste',
      periodo: 2011,
      dado: 4.4,
      fonte: 'Real 500W Santa Efigênea'
    });
  });*/