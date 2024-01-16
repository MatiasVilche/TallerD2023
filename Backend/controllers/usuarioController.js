const Usuario = require('../models/Usuario')

// CREACION DE NUEVO USUARIO
const createUsuario = async (req, res) => {
	const { rut, password,nombre, numero, tipoUsuario,estadoUsuario} = req.body;	  
	const newUsuario = new Usuario({
		rut,
		password,
		nombre,
        numero,
        tipoUsuario,
		estadoUsuario
	});

	newUsuario.save((err, usuario) => {
		if (err){	
			return res.status(400).send({ message: "Error al guardar" })
		}else
            res.status(200).send(usuario)
        })
	} 

// OBTENER LISTA DE USUARIOS
const getUsuarios = (req, res) => {

	Usuario.find({}, (err, usuarios) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(usuarios);
	})
}

// OBTENER UN USUARIO ESPECIFICO
const getUsuario = (req, res) => {
    let id = req.params.id
    Usuario.findById(id, (err, usuarios) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(usuarios);
    })
}

// MODIFICAR EL ESTADO LABORAL DE UN USUARIO
const updateUsuario = (req, res) => {
    let id = req.params.id
	let CU = req.params.typeUser

    Usuario.findByIdAndUpdate(id, req.body, (err, usuario) => {
		if (err) return res.status(400).send({ message: "Error al modificar usuario" })
		else
		if (CU == 1){
		res.send(usuario)
		}else 
		return res.status(400).send({ message: "No tiene los permisos para actualizar un usuario" })
	})
}
// ELIMINAR USUARIO
const deleteUsuario = (req, res) => {
	let id = req.params.id
	let CU = req.params.typeUser
	
	Usuario.findByIdAndDelete(id, (err, result) => {
		if (err) res.status(400).send({ message: err })
		else
		if (CU == 1){
		res.status(200).send(result)
		}else 
		return res.status(400).send({ message: "No tiene los permisos para eliminar un usuario" })
	})
}

// OBTENER EL ADMIN ACTUALMENTE CONTRATADO

const getCurrentAdmin = (req, res) => {
    
	Usuario.find({tipoUsuario: 0},{estadoUsuario:0}, (err, usuarios) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(usuarios);
	})
}

const login = (req, res) => {
	
	Usuario.findOne({rut: req.body.rut}, (err, result) => {
		if (err) return res.status(200).send({success: false, message: "Ocurrio un error"})
		
		if(result) {
			return res.status(200).send({success: true, message: "Inicio exitoso"})
		} else {
			return res.status(200).send({success: false, message: "Usuario no encontrado"});
		}
	})
}

const isAdmin = (req, res) => {
	let reqRut = req.params.id

	Usuario.findOne({rut: reqRut}, (err, result) => {
		if (err) return res.status(400).send({msg:err})
		if(result){	
			//console.log(result)
			if (result.tipoUsuario === 0){
			return res.status(202).send({msg: "TRUE", userId: result._id})
			}
			if (result.tipoUsuario === 1){
				return res.status(200).send({msg: "FALSE", userId: result._id})
			}
			if (result.tipoUsuario === 2)
			return res.status(203).send({msg: "FALSE", userId: result._id})
		}
	})
}

const updateEstadoUsuario = (req, res) => {
	let id = req.params.id

    Usuario.findByIdAndUpdate(id,{"estadoUsuario": 2}, (err, usuario) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del usuario"})
        }res.status(200).send(usuario);
	})
}

const updateEstadoUsuario2 = (req, res) => {
	let id = req.params.id

    Usuario.findByIdAndUpdate(id,{"estadoUsuario": 0}, (err, usuario) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del usuario"})
        }res.status(200).send(usuario);
	})
}

module.exports = {
	createUsuario,
	getUsuarios,
	getUsuario,
	updateUsuario,
	deleteUsuario,
	getCurrentAdmin,
	isAdmin,
	login,
	updateEstadoUsuario,
	updateEstadoUsuario2
}