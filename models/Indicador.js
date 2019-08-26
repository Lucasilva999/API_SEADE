const mongoose = require('mongoose');

const IndicadorSchema = new mongoose.Schema({
    oe_origem: {
        type: Number,
        required: true
    },
    indicador_id: {
        type: Number,
        required: true
    },
    indicador_nome: {
        type: String,
        required: true
    },
    fonte: {
        fonte_id: {
            type: Number,
            required: true
        },

        fonte_nome: {
            type: String,
            required: true
        },
        nota: {
            type: String,
            required: false,
            default: null
        }
    },
    periodo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'periodo',
        required: true
    }]
})

module.exports = mongoose.model('indicador', IndicadorSchema);