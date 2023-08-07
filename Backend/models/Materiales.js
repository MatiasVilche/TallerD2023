const mongoose = require('mongoose')

const materialSchema = mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    cantidad:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Materiales', materialSchema)