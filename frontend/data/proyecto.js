import axios from 'axios';

const createProyecto = (material) => {
    const response = axios.post(`${process.env.SERVIDOR}/Proyecto/`,material);
    return response
}

const agregarMaterialAProyecto = (id, material) => {
    const response = axios.put(`${process.env.SERVIDOR}/Proyecto/agregar/${id}`,material);
    return response
}

const getProyecto = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Proyecto`)
    return response
}

module.exports = {
    createProyecto,
    agregarMaterialAProyecto,
    getProyecto
}