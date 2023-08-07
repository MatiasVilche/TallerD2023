const Historial = require('../models/Historial')

const createHistorial = (req, res) => {
	const { rutTrabajador, codigoProducto ,cantidad ,tipo ,proyecto ,fecha,descripcion} = req.body
	const newHistorial = new Historial({
		rutTrabajador,
        codigoProducto,
        cantidad,
		tipo,
		proyecto,
        fecha,
		descripcion
	})

	newHistorial.save((err, historial) => {
		if (err){res.status(400).send({ message: "error guardando" })
    }res.status(200).send(historial)
	})
}

const getHistorial = (req, res) => {

	Historial.find({}, (err, historiales) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(historiales);
	})
}


module.exports = {
    createHistorial,
	getHistorial
}