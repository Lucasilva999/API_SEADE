const mongoose = require('mongoose');

const PeriodoSchema = new mongoose.Schema({
    periodo: {
        type: Number,
        required: true
    },
    dado: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('periodo', PeriodoSchema);