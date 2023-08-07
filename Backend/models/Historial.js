const mongoose = require('mongoose')
const { Schema, model } = mongoose

const historialSchema = mongoose.Schema({
    rutTrabajador: {
        type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
    },
    codigoProducto: {
        type: Schema.Types.ObjectId,
		ref: 'Materiales',
		required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    tipo:{
        // 0 = Venta 1= Prestamo 2= Fabricacion
        type: Number, enum: [0 ,1 ,2 ],
        required: true
    },
    proyecto:{
        type: String
    },
    descripcion:{
        type: String
    },
    fecha:{
        type: String,
        required: true
    }
})

module.exports = model('Historial', historialSchema)

