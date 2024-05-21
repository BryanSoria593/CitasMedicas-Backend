const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validare-fields')

const {
    newCite,
    getCitesByPatient,
    getCite,
    deleteCite,
    getCitesByPending,
    getAssistedCites,
    updateCite
} = require('../controllers/cites.controller')

const { registerMedicamentByCite } = require('../controllers/medicalHistory.controller')

const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.use(validateJWT)

router.post(
    '/newCite',
    [
        check("fecha", "La fecha es obligatoria").notEmpty().isISO8601('yyyy-mm-dd'),
        check("id_usuario", "No existe el paciente").notEmpty().isNumeric(),
        check("id_doctor", "No existe el doctor").notEmpty().isNumeric(),
        check("id_disponibilidad", "No ha seleccionado un turno").notEmpty().isNumeric(),
        validateFields,
    ],
    newCite
)

router.post('/citesByPatient', getCitesByPatient)

router.post(
    '/getAssistedCites',
    [
        check("id_usuario", "El id no es válido").isNumeric(),
        check("user_rol", "El rol no es válido").isNumeric(),
        validateFields
    ],
    getAssistedCites
)

router.get(
    '/cite/:id',
    [
        check('id', 'El id pasada no es válido').isNumeric().notEmpty(),
        validateFields
    ],
    getCite
)

router.patch(
    '/cite/:id',
    [
        check('id', 'El id pasada no es válido').isNumeric().notEmpty(),
        validateFields
    ],
    deleteCite
)
router.patch(
    '/updateCite',
    [
        check('id_cita', 'El id pasada no es válido').isNumeric().notEmpty(),
        check("fecha", "La fecha es obligatoria").notEmpty().isISO8601('yyyy-mm-dd'),
        check('id_disponibilidad', 'El id pasada no es válido').isNumeric().notEmpty(),
        validateFields
    ],
    updateCite
)

router.post(
    '/pendingByPatient',
    [
        check("id_usuario", "El id debe ser un número").isNumeric().notEmpty(),
        check("user_rol", "El rol no es válido").isNumeric().notEmpty(),
        validateFields
    ],
    getCitesByPending
)

router.post(
    '/newMedicamentByCite',
    [
        check('id_cita', 'El id no es válido').isNumeric().notEmpty(),
        check('medicaments', 'Los medicamentos son obligatorios').isArray({ min: 1 }),
        check('medicaments.*.medicament', 'El campo "medicamento" es obligatorio').notEmpty(),
        check('medicaments.*.instruction', 'El campo "instrucción" es obligatorio').notEmpty(),
        check('images.*.name', 'No puede registrarse la imágen').notEmpty(),
        check('images.*.url', 'No puede registrarse la imágen').notEmpty(),
        validateFields
    ],
    registerMedicamentByCite
)

module.exports = router