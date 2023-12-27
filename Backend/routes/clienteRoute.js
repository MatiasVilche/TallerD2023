const express = require('express');
const api = express.Router();

const clienteController = require('../controllers/clienteController');

api.post('/', clienteController.createCliente);
api.get('/', clienteController.getClientes);
api.get('/search/:id', clienteController.getCliente);
api.delete('/:id/:typeUser', clienteController.deleteCliente);
api.put('/update/:id/:typeUser', clienteController.updateCliente);

module.exports = api;