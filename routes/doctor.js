const { Router } = require('express')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFields } = require('../middlewares/validare-fields')
const { check } = require('express-validator')
const {
    getDoctorsBySpeciality,
    getCitesByDoctor,
    getCitesAttendedByDoctor,
} = require('../controllers/doctors.controller')

const router = Router()
router.use(validateJWT)

router.post('/getDoctorsBySpeciality', getDoctorsBySpeciality, validateJWT)
router.get('/citesByDoctor', getCitesByDoctor, validateJWT)
router.post(
    '/attendedByDoctor',
    [
        check("id_usuario", "El id no es válido").isNumeric().notEmpty(),
        check("user_rol", "El id no es válido").isNumeric().notEmpty(),
        validateFields
    ],
    validateJWT,
    getCitesAttendedByDoctor
)

module.exports = router