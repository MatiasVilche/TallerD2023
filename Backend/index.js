require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    //connectTimeoutMS: 10000,
    //socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}

const materialRoute = require('./routes/materialRoute')
const mailerRoute = require('./routes/mailerRoute')
const historialRoute = require('./routes/historialRoute')
const usuarioRoute = require('./routes/usuarioRoute')
const proyectoRoute = require('./routes/proyectoRoute')
const clienteRoute = require('./routes/clienteRoute')
const fileRoutes = require('./routes/fileRoutes');
const pdfRoutes = require('./routes/pdfRoute');

const app = express();

// Configuración de CORS para permitir solicitudes desde el IP de .env
//const corsOptions = {
//    origin: process.env.FRONTEND,
//    credentials: true
//};

app.use(cors('*'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors());

app.use('/api/Material', materialRoute)
app.use('/api/Mailer', mailerRoute)
app.use('/api/Historial',historialRoute)
app.use('/api/Usuario', usuarioRoute)
app.use('/api/Proyecto', proyectoRoute)
app.use('/api/Cliente', clienteRoute)
app.use('/api/files', fileRoutes);
app.use('/api/pdf', pdfRoutes);

// Sirve los archivos estáticos desde la carpeta 'pdfs'
app.use('/PDF', express.static(path.join(__dirname, './PDF')));

mongoose.set('strictQuery', false);

mongoose.connect(process.env.URI, options, (error) => {
    if (error) console.log(error)
    else {
        console.log("Conectado a la base de datos")
    }
    })

    app.listen(process.env.PORT, () => {
    console.log("El backend esta corriendo en el puerto " + process.env.PORT)
    })