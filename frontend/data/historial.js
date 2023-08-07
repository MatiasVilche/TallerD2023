import axios from 'axios';

const createHistorial = (historial) => {
    const response = axios.post(`${process.env.SERVIDOR}/Historial/`,historial);
    return response
}

const getHistorial = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Historial`)
    return response
}

module.exports = {
    createHistorial,
    getHistorial
}