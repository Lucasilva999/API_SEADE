const mongoose = require('mongoose');

const IndicadorSchema = new mongoose.Schema({
    indicador_id: {
        type: String,
        required: true
    },
    nome: {
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
        }
    },
    periodo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'periodo',
        required: true
    }]
})

module.exports = mongoose.model('indicador', IndicadorSchema);