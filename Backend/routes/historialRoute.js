const express = require('express');
const api = express.Router();

const historialController = require('../controllers/historialController');

api.post('/', historialController.createHistorial);
api.get('/',historialController.getHistorial)

module.exports = api;