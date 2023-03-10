const { response } = require('express');
const bcrypt = require('bcryptjs');
const { connection } = require('../database/database');
const { generarJWT } = require('../helpers/jwt')
const jwt = require('jsonwebtoken');


const createUser = async (req, res = response) => {
    const { cedula, email, nombres, apellidos, fecha, ciudad, sexo, password } = req.body;
    const newUser = {
        cedula,
        email,
        nombres,
        apellidos,
        fecha,
        ciudad,
        sexo,
        password,
        user_rol: 0
    }
    try {
        const [rows] = await connection.query("SELECT * FROM `usuario` WHERE `email` = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        const [userRegister] = await connection.query("INSERT INTO `usuario` SET ?", [newUser]);
        if (!userRegister) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al crear el usuario'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            uid: userRegister.insertId

        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        // Verificar si el email existe
        const [rows] = await connection.query("SELECT * FROM `usuario` WHERE `email` = ?", [email]);

        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        //usuario existe
        const user = rows[0];

        // Verificar contraseña

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(user.id_usuario, user.nombres, user.apellidos, user.user_rol, user.email, user.imagen);
        if (!token) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al generar el token'
            })
        }

        const menuOptions = await getMenuOptions(user.user_rol, req, res);

        res.status(200).json({
            ok: true,
            user: {
                id: user.id_usuario,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                imagen: user.imagen,
                token
            },
            menuOptions,

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}
const getMenuOptions = async (user_rol, req, res = response) => {

    try {

        const [rows] = await connection.query("SELECT * FROM `accesos` WHERE `id_rol` = ?", [user_rol]);
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay opciones de menú para este rol'
            })
        }
        return rows;

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {
    try {
        const { uid, nombres, apellidos, user_rol, email, imagen } = req;
        //Generar JWT
        const token = await generarJWT(uid, nombres, apellidos, user_rol, email, imagen);


        const menuOptions = await getMenuOptions(user_rol, req, res);

        res.json({
            ok: true,
            user: {
                id_usuario: uid,
                nombres,
                apellidos,
                email,
                imagen,
                token
            },
            menuOptions,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador',
        })
    }
}

module.exports = {
    loginUsuario,
    createUser,
    getMenuOptions,
    revalidarToken
}