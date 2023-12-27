const mongoose = require('mongoose');
const materialSchema = require('./Materiales');
const { Schema, model } = mongoose

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    materiales:
        [materialSchema.schema]
    ,
    cliente:{
        type: Schema.Types.ObjectId,
		ref: 'Cliente',
		required: true
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaTermino:{
        type: String
    },
    estado: {
        //0= activo 1=inactivo
        type: Number, enum: [0, 1],default: 0
    }
});

module.exports = mongoose.model('Proyectos', proyectoSchema)
