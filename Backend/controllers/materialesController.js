const Material = require('../models/Materiales')

// CREACION DE MATERIAL
const createMaterial = (req, res) => {
	const { codigo, nombre , descripcion, cantidad, estadoMaterial} = req.body
	const newMaterial = new Material({
		codigo,
		nombre,
		descripcion,
		cantidad,
		estadoMaterial
	})

	newMaterial.save((err, material) => {
		if (err){res.status(400).send({ message: "error guardando" })
    }res.status(200).send(material)
	})
}

// OBTENER LISTA DE LOS MATERIALES
const getMateriales = (req, res) => {

	Material.find({}, (err, materiales) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(materiales);
	})
}

// OBTENER UN MATERIAL ESPECIFICO
const getMaterial = (req, res) => {
    let id = req.params.id
    Material.findById(id, (err, materiales) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(materiales);
    })
}


// MODIFICAR UN MATERIAL
const updateMaterial = (req, res) => {
	let id = req.params.id
    Material.findByIdAndUpdate(id, req.body, (err, material) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el material"})
        }res.status(200).send(material);
	})
}
// ELIMINAR UN MATERIAL
const deleteMaterial = (req, res) => {
	let id = req.params.id
	Material.findByIdAndDelete(id, (err, material) => {
		if (err) {res.status(400).send({ message: err })
        }res.status(200).send(material);
	})
}

// MODIFICAR CANTIDAD DE UN MATERIAL
const updateCantidadMaterial = (req, res) => {
	let id = req.params.id
	let cantidad = req.params.cantidad
    Material.findByIdAndUpdate(id,{"cantidad": cantidad}, (err, material) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el material"})
        }res.status(200).send(material);
	})
}

const updateEstadoMaterial = (req, res) => {
	let id = req.params.id

    Material.findByIdAndUpdate(id,{"estadoMaterial": 1}, (err, material) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del material"})
        }res.status(200).send(material);
	})
}

const updateEstadoMaterial2 = (req, res) => {
	let id = req.params.id

    Material.findByIdAndUpdate(id,{"estadoMaterial": 0}, (err, material) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del material"})
        }res.status(200).send(material);
	})
}

module.exports = {
    createMaterial,
    getMateriales,
    updateMaterial,
    deleteMaterial,
	getMaterial,
	updateCantidadMaterial,
	updateEstadoMaterial,
	updateEstadoMaterial2
}