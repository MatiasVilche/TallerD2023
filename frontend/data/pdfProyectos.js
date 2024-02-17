import axios from 'axios';

const getPdfList = async (subfolder = '') => {
  try {
    const response = await axios.get(`${process.env.SERVIDOR}/pdf/list-pdfs/${subfolder}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de archivos PDF:', error);
    throw error;
  }
};

module.exports = {
  getPdfList,
  // ... otras funciones como createHistorial y getHistorial
};

