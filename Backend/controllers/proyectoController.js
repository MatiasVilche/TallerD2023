const Proyecto = require('../models/ProyectoModel');
const fs = require('fs');
const path = require('path');

const crearProyecto = async (req, res) => {
    try {
        const { nombre, materiales, etapa, cliente, descripcion, fechaInicio, fechaTermino, estado } = req.body;
        
        // Crear el nuevo proyecto
        const proyecto = new Proyecto({
            nombre,
            materiales,
            etapa: "0",
            cliente,
            descripcion,
            fechaInicio,
            fechaTermino: "0",
            estado: "0"    
        });
        
        const nuevoProyecto = await proyecto.save();
        
        // Definir la ruta de la nueva carpeta del proyecto
        const pdfFolderPath = path.join(__dirname, '../PDF', nuevoProyecto._id +"-"+ nombre);
        
        // Crear la carpeta del proyecto si no existe
        if (!fs.existsSync(pdfFolderPath)) {
            fs.mkdirSync(pdfFolderPath, { recursive: true });

			// Crear un archivo de texto vacío con el mismo nombre que la carpeta
			const txtFileName = path.join(pdfFolderPath, proyecto.nombre + '.txt');
			fs.writeFileSync(txtFileName, '', 'utf8');
        }

        // Responder con el nuevo proyecto
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

const updateProyecto = (req, res) => {
	let id = req.params.id
    Proyecto.findByIdAndUpdate(id, req.body, (err, proyecto) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el proyecto"})
        }res.status(200).send(proyecto);
	})
}

const deleteMaterialFromProject = (req, res) => {
	let projectId = req.params.id;
	let materialId = req.body.idMaterial; // Cambia esta línea

	Proyecto.findById(projectId, (err, project) => {
		if (err) {
			res.status(400).send({ message: err });
		} else {
			// Comprueba si el proyecto y sus materiales existen
			if (!project || !project.materiales) {
				res.status(400).send({ message: "No se encontraron el proyecto o los materiales" });
			} else {
				// Comprueba si el material que queremos eliminar existe en el array de materiales
				for (let i = 0; i < project.materiales.length; i++) {
					if (project.materiales[i]._id == materialId) {
						
						materialExists = project.materiales[i]

						// Elimina el material del array
						project.materiales.pull(project.materiales[i]);
						
						// Actualiza el proyecto
						Proyecto.updateOne({ _id: projectId }, { $set: { materiales: project.materiales } }, (err) => {
							if (err) {
								res.status(500).send({ message: err });
							} else {
								res.status(200).send({ message: "Material eliminado" });
							}
						});
						
						break;
					}
				}
			}
		}
	})
}

//Deshabilitar el proyecto
const updateEstadoProyecto = (req, res) => {
	let id = req.params.id

    Proyecto.findByIdAndUpdate(id,{"estado": 1}, (err, proyecto) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del usuario"})
        }res.status(200).send(proyecto);
	})
}

//Habilitar el proyecto
const updateEstadoProyecto2 = (req, res) => {
	let id = req.params.id

    Proyecto.findByIdAndUpdate(id,{"estado": 0}, (err, proyecto) => {
		if (err){
            res.status(400).send({ message: "Error al modificar el estado del usuario"})
        }res.status(200).send(proyecto);
	})
}

module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectoPorId,
	agregarMaterialAProyecto,
	updateProyecto,
	deleteMaterialFromProject,
	updateEstadoProyecto,
	updateEstadoProyecto2
};
