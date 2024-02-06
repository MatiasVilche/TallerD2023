require("dotenv").config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORTEMAIL,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});


const sendCustomEmail = async (msg) => {
    const mensaje = {
        from : process.env.USER,
        to : process.env.TO,
        subject : 'Aviso de stock critico inventario Biosur',
        text : "Stock Critico, quedan menos de 10 unidades de "+ msg.params.message,
    }

    await transporter.sendMail(mensaje);

    return 1;
}

const sendCustomEmailPassword = async (msg) => {
    const mensaje = {
        from : process.env.USER,
        to : msg.destino,
        subject : "Cambio de contraseña " + msg.user + " Sistema Biosur",
        text: "Estimado " + msg.user + ", la recuperación de contraseña fue exitosa.\n\nSe le proporcionará una nueva contraseña, por favor cambiarla a la brevedad a una que usted estime conveniente.\n\nNUEVA CONTRASEÑA:\n" + msg.password + "" // Accede directamente a la propiedad 'password'
    };

    await transporter.sendMail(mensaje);

    return   1;
}

const enviarMail = (message,res) => {
    sendCustomEmail(message)
    res.status(200).send({ message: "Se envio el correo con exito" })
}

const enviarMailPassword = (req, res) => {
    const message = req.body; // Extrae el cuerpo de la solicitud
    sendCustomEmailPassword(message)
    res.status(200).send({ message: "Se envio el correo de recuperación con exito" });
}


module.exports = {
    enviarMail,
    enviarMailPassword
}