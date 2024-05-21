const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const {
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
} = require('../controllers/auth.controller')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFields, validatePassword } = require('../middlewares/validare-fields')

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
        check('newPassword', 'El password de ser de 8 caracteres').isLength({ min: 8 }),
        check('confirmPassword', 'El password debe ser igual').notEmpty(),
        validateFields,
        validatePassword
    ],
    createUser
)

router.post(
    '/login',
    [
        check('email', 'El correo es obligatorio').notEmpty(),
        check('password', 'Contraseña incorrecta').isLength({ min: 6 }),
        validateFields
    ],
    loginUsuario
)

router.post(
    '/resetPassword',
    [
        check('email', 'El correo es obligatorio').isEmail(),
    ],
    sendEmailForResetPassword
)

router.post(
    '/renewPassword',
    [
        check('token', 'El token es obligatorio').notEmpty(),
        check('newPassword', 'El password de ser de 8 caracteres').isLength({ min: 8 }),
        check('confirmPassword', 'El password debe ser igual').notEmpty(),
        validateFields,
        validatePassword
    ],
    updatePasswordWithToken
)

router.post(
    '/validateTokenForResetPassword',
    [
        check('token', 'El token es obligatorio').notEmpty(),
        validateFields
    ],
    validateTokenForResetPassword
)

router.post(
    '/validateToken',
    validateToken
)

router.patch(
    '/updateProfile',
    [
        check('nombres', 'El nombre es obligatorio').isLength({ min: 3 }),
        check('apellidos', 'El apellido es obligatorio').isLength({ min: 3 }),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').notEmpty(),
        validateFields
    ],
    validateJWT,
    updateProfileUser
)

router.patch(
    '/updatePassword',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('currentPassword', 'No existe password').notEmpty(),
        check('newPassword', 'El password de tener almenos 8 caracteres').isLength({ min: 8 }),
        check('confirmPassword', 'Las contraseñas no coinciden').notEmpty(),
        validateFields,
        validatePassword
    ],
    validateJWT,
    updatePassword
)

router.post(
    '/options',
    [
        check('user_rol', 'No existe rol').notEmpty().isNumeric(),
        validateFields
    ],
    validateJWT,
    getMenuOptions
)

router.post('/renew', validateJWT, revalidarToken)

module.exports = router