const mongoose = require('mongoose');
const materialSchema = require('./Materiales');

const proyectoSchema = mongoose.Schema({
    nombre: {
    type: String,
    required: true
    },
    materiales: [materialSchema.schema]
});

module.exports = mongoose.model('Proyectos', proyectoSchema)
