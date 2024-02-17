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
    etapa:{
        //0= inicio 1=intermedia 2=final
        type: Number,
		enum: [0, 1, 2],
        default: 0
    }
    ,
    cliente:{
        type: Schema.Types.ObjectId,
		ref: 'Cliente',
		required: true
    },
    descripcion:{
        type: String
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
        type: Number, 
        enum: [0, 1],
        default: 0
    }
});

module.exports = mongoose.model('Proyectos', proyectoSchema)
