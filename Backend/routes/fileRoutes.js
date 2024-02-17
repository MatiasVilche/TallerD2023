const express = require('express');
const api = express.Router();

const fileUploadController = require('../controllers/fileUpload');

// Añade el parámetro :folderName a la ruta
api.post('/upload/:folderName', fileUploadController.uploadPDF);

module.exports = api;
