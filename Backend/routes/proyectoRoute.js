const express = require('express');
const api = express.Router();

const proyectoController = require('../controllers/proyectoController');

api.post('/', proyectoController.crearProyecto);
api.get('/', proyectoController.obtenerProyectos);
api.get('/search/:id', proyectoController.obtenerProyectoPorId);
api.put('/agregar/:id', proyectoController.agregarMaterialAProyecto);

api.put('/actualizar/:id', proyectoController.updateProyecto);
api.put('/actualizarMaterial/:id',proyectoController.deleteMaterialFromProject);

api.put('/deshabilitar/:id', proyectoController.updateEstadoProyecto);
api.put('/habilitar/:id', proyectoController.updateEstadoProyecto2);

//api.delete('/eliminar/:id', proyectoController.eliminarProyecto);

module.exports = api;
