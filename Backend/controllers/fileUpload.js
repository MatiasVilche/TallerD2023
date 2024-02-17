const multer = require('multer');
const path = require('path');

// Función para obtener la configuración de multer con un path dinámico
function getMulterConfig(destinationPath) {
    return multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../PDF', destinationPath));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
    });
}

exports.uploadPDF = (req, res) => {
  // Obtén el nombre de la carpeta desde los parámetros de la ruta
    const folderName = req.params.folderName;

  // Crea una nueva instancia de multer con la configuración dinámica
    const upload = getMulterConfig(folderName);

    upload.single('pdfFile')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        console.error('Error de Multer:', err);
    return res.status(500).json(err);
    }else if (err) {
        console.error('Error general:', err);
    return res.status(500).json(err);
    }
        console.log('Archivo subido:', req.file);
    return res.status(200).send(req.file);
    });
};


