import axios from 'axios';

const createMaterial = (material) => {
    //console.log(Usuario)
    const response = axios.post(`${process.env.SERVIDOR}/Material/`,material);
    return response
}

const getMateriales = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Material`)
    return response
}

const deleteMaterial = (id) => {
    const response = axios.delete(`${process.env.SERVIDOR}/Material/eliminar/${id}`)
    return response
}

const updateMaterial = (id, material) => {
    const response = axios.put(`${process.env.SERVIDOR}/Material/actualizar/${id}`,material)
    return response
}

const getMaterial = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Material/search/${id}`)
    return response
}

const updateCantidadMaterial = (id, cantidad) => {
    const response = axios.put(`${process.env.SERVIDOR}/Material/actualizar/${id}`,{"cantidad":cantidad})
    return response
}

module.exports = {
    createMaterial,
    getMateriales,
    deleteMaterial,
    updateMaterial,
    getMaterial,
    updateCantidadMaterial
}
