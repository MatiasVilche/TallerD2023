import axios from 'axios';

const createCliente = (cliente) => {
    const response = axios.post(`${process.env.SERVIDOR}/Cliente/`,cliente);
    return response 
}

const getClientes = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Cliente`)
    return response
    
}

const getCliente = async (id) => {
    //console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/Cliente/search/${id}`)
    return response
}

const updateCliente = (id, cliente) => {
    const response = axios.put(`${process.env.SERVIDOR}/Cliente/update/${id}/1`,cliente)
    return response
}

const deleteCliente = (id,x) => {
    const response = axios.delete(`${process.env.SERVIDOR}/Cliente/${id}/1`)
    return response
}

const updateEstadoCliente = (id) => {
    const response = axios.put(`${process.env.SERVIDOR}/Cliente/updateEstado/${id}`)
    return response
}

const updateEstadoCliente2 = (id) => {
    const response = axios.put(`${process.env.SERVIDOR}/Cliente/updateEstado2/${id}`)
    return response
}

module.exports = {
    createCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente,
    updateEstadoCliente,
    updateEstadoCliente2
    
}