const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {
        const { id_usuario, nombres, apellidos, user_rol, email } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.id_usuario = id_usuario
        req.nombres = nombres
        req.apellidos = apellidos
        req.user_rol = user_rol
        req.email = email

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'La sesión ha expirado'
        })
    }
    next()
}

module.exports = {
    validateJWT
}