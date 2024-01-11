import axios from 'axios';

const login =  (rut) => {
    const response =  axios.post(`${process.env.SERVIDOR}/usuario/usr/login/`, { rut });
    return response
}

const getUsuarios = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario`)
    return response
    
}

const isAdmin = async (rut) => {
    //let rut = localStorage.getItem("token")
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario/query/${rut}`)
    return response
}


const getUsuario = async (id) => {
    //console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario/search/${id}`)
    return response
}

const createUsuario = (Usuario) => {
    //console.log(Usuario)
    const response = axios.post(`${process.env.SERVIDOR}/Usuario/`,Usuario);
    return response 
}


const deleteUsuario = (id,x) => {
    const response = axios.delete(`${process.env.SERVIDOR}/Usuario/${id}/1`)
    return response
}

const updateUsuario = (id, usuario) => {
    const response = axios.put(`${process.env.SERVIDOR}/Usuario//update/${id}/1`,usuario)
    return response
}

const updateEstadoUsuario = (id) => {
    const response = axios.put(`${process.env.SERVIDOR}/Usuario/updateEstado/${id}`)
    return response
}

module.exports = {
    login,
    getUsuarios,
    getUsuario,
    isAdmin,
    createUsuario,
    deleteUsuario,
    updateUsuario,
    updateEstadoUsuario
}