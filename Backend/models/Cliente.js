const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    estadoCliente: {
      // 0 = Cliente activo  1= Cliente inactivo
        defaultValue: 0,
        type: Number, enum: [0, 1],
        required: true
    }
})

module.exports = mongoose.model('Cliente', clienteSchema)