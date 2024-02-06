const express = require('express');
const api = express.Router();

const mailerController = require('../controllers/mailerController');

// Ruta para enviar un correo de recuperación de contraseña
api.post('/password', mailerController.enviarMailPassword);

// Ruta para enviar un correo genérico
api.post('/materiales/:message', mailerController.enviarMail);

module.exports = api;
