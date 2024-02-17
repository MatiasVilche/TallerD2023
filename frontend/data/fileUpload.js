import axios from 'axios';

const uploadPdf = async (file, folderName) => {
  const formData = new FormData();
  formData.append('pdfFile', file);

  try {
    // Asegúrate de reemplazar 'yourFolderName' con el nombre real de la carpeta que deseas usar
    const response = await axios.post(`${process.env.SERVIDOR}/files/upload/${folderName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    throw error;
  }
};

module.exports = {
  uploadPdf
};

