const { response } = require('express');
const { validationResult } = require('express-validator');
const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

const validarPassword = (req, res = response, next) => {
    const { password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        return res.status(400).json({
            ok: false,
            msg: 'Las contraseñas no coinciden'
        })
    }
    next();
}

module.exports = {
    validarCampos,
    validarPassword
}