const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const RegistroSchema = new mongoose.Schema({
    oe: {
        type: Number,
        required: true
    },
    indicador: {
        type: String,
        required: true
    },
    periodo: {
        type: Number,
        required: true
    },
    dado: {
        type: Number,
        required: true
    },
    fonte: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('registro', RegistroSchema);