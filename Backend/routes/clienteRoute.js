const express = require('express');
const api = express.Router();

const clienteController = require('../controllers/clienteController');

api.post('/', clienteController.createCliente);
api.get('/', clienteController.getClientes);
api.get('/search/:id', clienteController.getCliente);
api.delete('/:id/:typeUser', clienteController.deleteCliente);
api.put('/update/:id/:typeUser', clienteController.updateCliente);
api.put('/updateEstado/:id', clienteController.updateEstadoCliente);
api.put('/updateEstado2/:id', clienteController.updateEstadoCliente2);

module.exports = api;