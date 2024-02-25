import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = () => {
    return Cookies.get('tokenAuth'); // Utiliza Cookies.get en lugar de localStorage.getItem
}

const login =  (rut) => {
    const response =  axios.post(`${process.env.SERVIDOR}/usuario/usr/login/`, { rut },{ withCredentials: true });
    return response
}

const getUsuarios = async () => {
    const token = getToken();
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response
    
}

const isAdmin = async (rut) => {
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario/query/${rut}`)
    return response
}


const getUsuario = async (id) => {
    const token = getToken();
    const response = await axios.get(`${process.env.SERVIDOR}/Usuario/search/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

const createUsuario = (Usuario) => {
    const token = getToken();
    const response = axios.post(`${process.env.SERVIDOR}/Usuario/`, Usuario, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

const deleteUsuario = (id) => {
    const token = getToken();
    const response = axios.delete(`${process.env.SERVIDOR}/Usuario/${id}/1`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

const updateUsuario = (id, usuario) => {
    const response = axios.put(`${process.env.SERVIDOR}/Usuario/update/${id}/1`, usuario)
    return response;
}

const updateEstadoUsuario = (id) => {
    const token = getToken();
    const response = axios.put(`${process.env.SERVIDOR}/Usuario/updateEstado/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

const updateEstadoUsuario2 = (id) => {
    const token = getToken();
    const response = axios.put(`${process.env.SERVIDOR}/Usuario/updateEstadoRetorno/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}


module.exports = {
    login,
    getUsuarios,
    getUsuario,
    isAdmin,
    createUsuario,
    deleteUsuario,
    updateUsuario,
    updateEstadoUsuario,
    updateEstadoUsuario2
}