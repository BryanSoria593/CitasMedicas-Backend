const jwt = require('jsonwebtoken');


const generarJWT = async (uid, nombres, apellidos, user_rol, email, imagen) => {
    const payload = { uid, nombres, apellidos, user_rol, email, imagen };
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' });
}

module.exports = {
    generarJWT
}
