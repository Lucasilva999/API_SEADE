const jwt = require('jsonwebtoken');

//Cria O Token de Acesso para o usuário
const criarTokenUsuario = (usuario) => {
    return jwt.sign({usuario}, process.env.TOKENKEY, {expiresIn: '1h'});
}

module.exports = criarTokenUsuario;