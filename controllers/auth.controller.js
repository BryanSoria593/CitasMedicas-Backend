const { response } = require('express')
const bcrypt = require('bcryptjs')
const { connection } = require('../database/database')
const { generateJWT, generateJwtForResetPassword } = require('../helpers/jwt')
const jwt = require('jsonwebtoken')
const { sendEmailForResetPass } = require('../helpers/sendMail')

const createUser = async (req, res = response) => {
    const { cedula, email, nombres, apellidos, fecha, ciudad, sexo, newPassword } = req.body
    const newUser = {
        cedula,
        email,
        nombres,
        apellidos,
        fecha,
        ciudad,
        sexo,
        password: newPassword,
        user_rol: 0
    }

    try {
        const [rows] = await connection.query("SELECT * FROM `usuario` WHERE `email` = ?", [email])
        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        newUser.password = bcrypt.hashSync(newPassword, salt)

        const [userRegister] = await connection.query("INSERT INTO `usuario` SET ?", [newUser])
        if (!userRegister) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al crear el usuario'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            uid: userRegister.insertId

        })

    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body
    try {

        const [rows] = await connection.query("SELECT * FROM usuario WHERE email = ?", [email])
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        const user = rows[0]
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generateJWT(user.id_usuario, user.nombres, user.apellidos, user.user_rol, user.email)
        if (!token) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al generar el token'
            })
        }

        const menuOptions = await getMenuOptions(user.user_rol, req, res)

        res.status(200).json({
            ok: true,
            user: {
                id_usuario: user.id_usuario,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                user_rol: user.user_rol,
                token
            },
            menuOptions,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

const sendEmailForResetPassword = async (req, res = response) => {
    try {
        const { email } = req.body
        const [rows] = await connection.query("SELECT nombres, apellidos, email FROM usuario WHERE email = ?", [email])
        if (rows.length < 1) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        const user = rows[0]
        const token = await generateJwtForResetPassword(email, user.nombres, user.apellidos)
        if (!token) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al generar el token'
            })
        }

        sendEmailForResetPass(email, user.nombres, user.apellidos, token)

        return res.status(200).json({
            ok: true,
            msg: 'Correo enviado correctamente'
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

const getMenuOptions = async (user_rol, req, res = response) => {
    try {
        const [rows] = await connection.query("SELECT * FROM `accesos` WHERE `id_rol` = ?", [user_rol])
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay opciones de menú para este rol'
            })
        }
        return rows
    } catch (TokenExpiredError) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}
const revalidarToken = async (req, res = response) => {
    try {
        const { id_usuario, nombres, apellidos, email, user_rol } = req
        const token = await generateJWT(id_usuario, nombres, apellidos, user_rol, email)
        const menuOptions = await getMenuOptions(user_rol, req, res)

        res.json({
            ok: true,
            user: {
                id_usuario,
                nombres,
                apellidos,
                email,
                user_rol,
                token
            },
            menuOptions,
        })
    } catch {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

const validateTokenForResetPassword = async (req, res = response) => {
    const { token } = req.body
    try {
        const verify = jwt.verify(token, process.env.SECRET_JWT_SEED)
        if (!verify) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        }
        return res.status(200).json({
            ok: true,
            data: verify
        })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token expirado'
            })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado, hable con el administrador'
            })
        }
    }
}


const validateToken = async (req, res = response) => {
    try {
        const token = req.header('x-token') || req.body.token
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token'
            })
        }
        const verify = jwt.verify(token, process.env.SECRET_JWT_SEED)

        if (!verify) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Token válido',
        })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token expirado'
            })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado, hable con el administrador'
            })
        }
    }
}

const updateProfileUser = async (req, res = response) => {
    const { nombres, apellidos, email, password } = req.body

    try {
        const [rows] = await connection.query("SELECT email, password FROM usuario WHERE email = ?", [email])

        if (rows.length < 1) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        const user = rows[0]
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const queryUpdateUser = "UPDATE usuario SET nombres = ?, apellidos = ? WHERE email = ?"
        const [updateUser] = await connection.query(queryUpdateUser, [nombres, apellidos, email])

        if (!updateUser) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al actualizar el usuario'
            })
        }

        return res.json({
            ok: true,
            msg: 'Datos actualizados, vuelva a iniciar sesión'
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado, hable con el administrador'
        })
    }
}

const updatePasswordWithToken = async (req, res = response) => {
    const { token, newPassword } = req.body

    try {
        const verify = jwt.verify(token, process.env.SECRET_JWT_SEED)
        const { email } = verify

        if (!verify) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        }

        const [rows] = await connection.query("SELECT email, password FROM usuario WHERE email = ?", [email])

        if (rows.length < 1) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        const user = rows[0]
        const newPasswordSalt = bcrypt.hashSync(newPassword, user.salt)

        const [updatePassword] = await connection.query("UPDATE usuario SET password = ? WHERE email = ?", [newPasswordSalt, email])

        if (!updatePassword) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al actualizar la contraseña'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada correctamente'
        })

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token expirado'
            })
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error inesperado, hable con el administrador'
            })
        }
    }
}

const updatePassword = async (req, res = response) => {
    const { email, currentPassword, newPassword } = req.body
    try {
        const [rows] = await connection.query("SELECT email, password FROM usuario WHERE email = ?", [email])

        if (rows.length < 1) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        const user = rows[0]
        const validPassword = bcrypt.compareSync(currentPassword, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const newPasswordSalt = bcrypt.hashSync(newPassword, user.salt)
        const [updatePassword] = await connection.query("UPDATE usuario SET password = ? WHERE email = ?", [newPasswordSalt, email])

        if (!updatePassword) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al actualizar la contraseña'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada correctamente'
        })

    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado, hable con el administrador'
        })
    }
}

module.exports = {
    loginUsuario,
    createUser,
    getMenuOptions,
    revalidarToken,
    validateToken,
    updateProfileUser,
    updatePassword,
    sendEmailForResetPassword,
    updatePasswordWithToken,
    validateTokenForResetPassword
}