// routes/pdfRoutes.js
const express = require('express');
const api = express.Router();

const pdfController = require('../controllers/pdfController');

api.get('/list-pdfs/:subfolder?', pdfController.getPdfList);

module.exports = api;
