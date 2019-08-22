const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const RegistroSchema = new mongoose.Schema({
    oe_id: {
        type: Number,
        required: true
    },
    oe_desc: {
        type: String,
        required: true
    },
    indicadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'indicador',
        required: true
    }]
})

module.exports = mongoose.model('registro', RegistroSchema);