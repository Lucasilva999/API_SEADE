const mongoose = require('mongoose');

const PeriodoSchema = new mongoose.Schema({
    indicador_origem: {
        type: Number,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },

    valor: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('periodo', PeriodoSchema);