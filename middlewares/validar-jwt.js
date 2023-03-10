const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        const { uid, nombres, apellidos, user_rol, email, imagen } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.uid = uid;
        req.nombres = nombres;
        req.apellidos = apellidos;
        req.user_rol = user_rol;
        req.email = email;
        req.imagen = imagen;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'La sesión ha expirado'
        });
    }
    next();

}

module.exports = {
    validarJWT
}