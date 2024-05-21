const { response } = require('express')
const { validationResult } = require('express-validator')

const validateFields = (req, res = response, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next()
}

const validatePassword = (req, res = response, next) => {
    const { newPassword, confirmPassword } = req.body

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Las contraseñas no coinciden'
        })
    }
    if (!validatePatternPassword(newPassword)) {
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial'
        })
    }
    next()
}

const validatePatternPassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/
    if (!pattern.test(password)) return false

    return true
}

module.exports = {
    validateFields,
    validatePassword
}