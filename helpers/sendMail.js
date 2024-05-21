const nodemailer = require('nodemailer');
const env = require('dotenv').config().parsed

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL,
        pass: env.PASSWORD_EMAIL
    }
})

async function sendEmailForResetPass(email, nombres, apellidos, token) {
    await transporter.sendMail({
        from: `"Clínica Vitalia ✚"<${env.EMAIL}>`,
        to: email,
        subject: "Restablecimiento de contraseña ✔",
        html: `
            <h1> Hola, ${nombres} ${apellidos} </h1>
            <p> Hemos recibido una solicitud para restablecer la contraseña de su cuenta en Clínica Vitalia. Por favor, siga el enlace a continuación para proceder con el restablecimiento: </p>
            <a href="${env.URL_FRONTEND}/auth/new-password/${token}">Renovar contraseña</a>
            <p> Si no solicitó este cambio, comuniquese con soporte técnico. </p>
            <p> Gracias, Equipo de soporte de Clínica Vitalia </p>
        `,
    })
}

module.exports = { sendEmailForResetPass }