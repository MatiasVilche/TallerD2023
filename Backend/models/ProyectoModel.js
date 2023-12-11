const mongoose = require('mongoose');
const materialSchema = require('./Materiales');

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    materiales: [materialSchema.schema],
    cliente:{
        type: String,
        required: true
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaTermino:{
        type: String
    }
});

module.exports = mongoose.model('Proyectos', proyectoSchema)
