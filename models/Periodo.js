const mongoose = require('mongoose');

const PeriodoSchema = new mongoose.Schema({
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