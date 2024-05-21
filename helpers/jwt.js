const jwt = require('jsonwebtoken')

const generateJWT = async (id_usuario, nombres, apellidos, user_rol, email) => {
    const payload = { id_usuario, nombres, apellidos, user_rol, email }
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '24h' })
}
const generateJwtForResetPassword = async (email, nombres, apellidos) => {
    const payload = { email, nombres, apellidos }
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '1h' })
}

module.exports = {
    generateJWT,
    generateJwtForResetPassword
}