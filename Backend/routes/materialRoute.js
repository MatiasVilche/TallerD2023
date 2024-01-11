const express = require('express');
const api = express.Router();

const materialesController = require('../controllers/materialesController');

api.post('/', materialesController.createMaterial);
api.get('/', materialesController.getMateriales);
api.put('/actualizar/:id', materialesController.updateMaterial);
api.delete('/eliminar/:id', materialesController.deleteMaterial);
api.get('/search/:id', materialesController.getMaterial);
api.put('/actualizarEspecifico/:id', materialesController.updateCantidadMaterial);
api.put('/updateEstado/:id', materialesController.updateEstadoMaterial);
api.put('/updateEstadoInactivo/:id', materialesController.updateEstadoMaterial2);

module.exports = api;