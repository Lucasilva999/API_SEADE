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
    indicador: {
        type: String,
        required: true
    },
    fonte: {
        type: String,
        required: true
    },
    periodos: [{
        ano: {
            type: Number,
            required: true
        },
        dado: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('registro', RegistroSchema);