const mongoose = require('mongoose')

const materialSchema = mongoose.Schema({
    codigo: {
        type: String,
        required: true
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
    },
    estadoMaterial:{
        // 0 = Material activo  1= Material inactivo(eliminacion logica)
        defaultValue: 0,
        type: Number, enum: [0, 1],
        required: true
    }
})

module.exports = mongoose.model('Materiales', materialSchema)