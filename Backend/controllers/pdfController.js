const fs = require('fs');
const path = require('path');

exports.getPdfList = (req, res) => {
  const subfolder = req.params.subfolder || ''; // Obtén la subcarpeta de los parámetros de la ruta
  const directoryPath = path.join(__dirname, '../PDF', subfolder);
  
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    // Filtrar solo archivos PDF
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    
    // Agregar la subcarpeta al nombre del archivo para mantener la ruta completa
    const fullPathFiles = pdfFiles.map(file => `${subfolder}/${file}`);
    res.json(pdfFiles);
  });
};

