const { Router } = require('express')
const { validateFields } = require('../middlewares/validare-fields')
const { getHistorialByCite } = require('../controllers/medicalHistory.controller')
const { validateJWT } = require('../middlewares/validate-jwt')
const { check } = require('express-validator')

const router = Router()

router.use(validateJWT)

router.post(
    '/getHistorialByCite',
    [
        check('idCite', 'El id no es válido').isNumeric(),
        validateFields
    ],
    getHistorialByCite
)

module.exports = router