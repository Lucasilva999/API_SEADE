const mongoose = require('mongoose');

const VariavelSchema = new mongoose.Schema({
    oe_origem: {
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
    periodo: {
            ano: {
                type: Number,
                required: true
            },
            valor: {
                type: Number,
                required: true
            }
    }
})

module.exports = mongoose.model('variavel', VariavelSchema);