const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { loginUsuario, createUser, getMenuOptions, revalidarToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos, validarPassword } = require('../middlewares/validar-campos');

router.post(
    '/new',
    [

        check('cedula', 'La cedula es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('nombres', 'El nombre es obligatorio').notEmpty(),
        check('apellidos', 'El apellido es obligatorio').notEmpty(),
        check('fecha', 'La fecha de nacimiento es obligatorio').isISO8601('yyyy-mm-dd'),
        check('ciudad', 'La ciudad es obligatorio').notEmpty(),
        check('sexo', 'El sexo es obligatorio').notEmpty(),
        check('password', 'El password de ser de 6 caracteres').isLength({ min: 6 }),
        check('passwordConfirm', 'El password debe ser igual').notEmpty(),
        validarCampos,
        validarPassword
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'El correo es obligatorio').notEmpty(),
        check('password', 'Contraseña incorrecta').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
)
router.post(
    '/options',
    [
        check('user_rol', 'No existe rol').notEmpty().isNumeric(),
        validarCampos
    ],
    validarJWT,
    getMenuOptions
)
router.post('/renew', validarJWT, revalidarToken);

module.exports = router;