const jwt = require('jsonwebtoken');

//Middleware Usado para Validação do Token criado para o usuário
const auth = (req, res, next) => {
    //Token recebido no Header da requisição com o nome de 'auth'
    /*
    const token_header = req.headers.auth;
    if(!token_header) return res.sendStatus(403);

    //Verifica o Token recebido e a chave de acesso passada junto com ele
    
    jwt.verify(token_header, process.env.TOKENKEY, (err, decoded)=> {
        if(err) return res.sendStatus(403);
        //Dados recebidos na criação do Token são recebidos e passados para uma variável local
        res.locals.auth_data = decoded;
        return next();
    })*/
    return next();
}

module.exports = auth;