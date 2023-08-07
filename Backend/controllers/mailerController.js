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

    const info = await transporter.sendMail(mensaje);

    return 1;
}

const enviarMail = (message,res) => {
    const aux = sendCustomEmail(message)
    res.status(200).send({ message: "Se envio el correo con exito" })
}


module.exports = {
    enviarMail
}