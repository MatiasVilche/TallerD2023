const Cliente = require('../models/Cliente')

// CREACION DE NUEVO CLIENTE
const createCliente = async (req, res) => {
    const { nombre, numero, email,estadoCliente} = req.body;	  
	const newCliente = new Cliente({
		nombre,
		numero,
        email,
        estadoCliente
	});

	newCliente.save((err, cliente) => {
		if (err){	
			return res.status(400).send({ message: "Error al guardar" })
		}else
            res.status(200).send(cliente)
        })
	} 

// OBTENER LISTA DE USUARIOS
const getClientes = (req, res) => {

	Cliente.find({}, (err, clientes) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(clientes);
	})
}

// OBTENER UN USUARIO ESPECIFICO
const getCliente = (req, res) => {
    let id = req.params.id
    Cliente.findById(id, (err, clientes) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(clientes);
    })
}

// MODIFICAR EL ESTADO LABORAL DE UN USUARIO
const updateCliente = (req, res) => {
    let id = req.params.id
	let CU = req.params.typeUser

    Cliente.findByIdAndUpdate(id, req.body, (err, cliente) => {
		if (err) return res.status(400).send({ message: "Error al modificar cliente" })
		else
		if (CU == 1){
		res.send(cliente)
		}else 
		return res.status(400).send({ message: "No tiene los permisos para actualizar un cliente" })
	})
}

// ELIMINAR USUARIO
const deleteCliente = (req, res) => {
	let id = req.params.id
	let CU = req.params.typeUser
	
	Cliente.findByIdAndDelete(id, (err, result) => {
		if (err) res.status(400).send({ message: err })
		else
		if (CU == 1){
		res.status(200).send(result)
		}else 
		return res.status(400).send({ message: "No tiene los permisos para eliminar un cliente" })
	})
}

module.exports = {
    createCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente
}