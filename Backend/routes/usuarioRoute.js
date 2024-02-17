const express = require('express');
const api = express.Router();

const usuarioController = require('../controllers/usuarioController');

api.post('/', usuarioController.createUsuario);
api.get('/', usuarioController.getUsuarios);
api.get('/search/:id', usuarioController.getUsuario);
api.delete('/:id/:typeUser', usuarioController.deleteUsuario);
api.put('/update/:id/:typeUser', usuarioController.updateUsuario);
api.get('/admin/', usuarioController.getCurrentAdmin);
api.post('/usr/login/', usuarioController.login);
api.get('/query/:id', usuarioController.isAdmin);
api.put('/updateEstado/:id', usuarioController.updateEstadoUsuario);
api.put('/updateEstadoRetorno/:id', usuarioController.updateEstadoUsuario2);
api.put('/updatePassword/:id', usuarioController.updateEstadoUsuario2);

module.exports = api;