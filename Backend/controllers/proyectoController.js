const Proyecto = require('../models/ProyectoModel');

// Crear un nuevo proyecto
const crearProyecto = async (req, res) => {
	try {
		const { nombre, materiales } = req.body;
		const proyecto = new Proyecto({
		nombre,
		materiales
	});
		const nuevoProyecto = await proyecto.save();
		res.status(201).json(nuevoProyecto);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Obtener todos los proyectos
const obtenerProyectos = (req, res) => {

	Proyecto.find({}, (err, Proyecto) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(Proyecto);
	})
}

// Obtener un proyecto por su ID
const obtenerProyectoPorId = (req, res) => {
    let id = req.params.id
    Proyecto.findById(id, (err, Proyecto) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(Proyecto);
    })
}

// Agregar materiales a un proyecto

const agregarMaterialAProyecto = (req, res) => {
	const id = req.params.id;
	const material = req.body.material;

	Proyecto.findById(id, (err, proyecto) => {
	if (err) {
		res.status(400).send({ message: err });
	} else {
		// Comprueba si el material ya existe dentro del proyecto
		const existingMaterial = proyecto.materiales.find(m => m._id.toString() === material._id.toString());
		if (existingMaterial) {
		  // Si el material ya existe suma las cantidades
		existingMaterial.cantidad += material.cantidad;
		} else {
		  // Si no existe entonces lo agrega como un nuevo material
		proyecto.materiales.push(material);
		}

		proyecto.save((err, proyectoActualizado) => {
		if (err) {
			res.status(500).send({ message: 'Error al agregar el material al proyecto' });
		} else {
			res.status(200).send(proyectoActualizado);
		}
		});
	}
	});
};


module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectoPorId,
	agregarMaterialAProyecto
};
