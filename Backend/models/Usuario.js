const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    rut: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
    ,
    nombre: {
      type: String,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    tipoUsuario: {
      // 0 = Admin  1= Trabajador 2= Superadministrador
      type: Number, enum: [0, 1, 2],
      required: true
    },
    estadoUsuario: {
      // 0 = Empleado activo  1= Empleado desvinculado 2= Inactivo(eliminacion logica)
      defaultValue: 0,
      type: Number, enum: [0, 1 , 2],
      required: true
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)