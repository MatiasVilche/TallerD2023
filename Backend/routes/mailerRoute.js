const express = require('express');
const api = express.Router();

const mailerController = require('../controllers/mailerController');

api.post('/:message', mailerController.enviarMail);

module.exports = api;