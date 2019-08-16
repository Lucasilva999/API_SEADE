const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const RegistroSchema = new mongoose.Schema({
    oe_num: {
        type: Number,
        required: true
    },
    oe: {
        type: String,
        required: true
    },
    variaveis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'variavel',
        required: true
    }]
})

module.exports = mongoose.model('registro', RegistroSchema);