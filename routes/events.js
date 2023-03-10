const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getEspecialidad, getTurnos } = require('../controllers/events.controller');
const {
    getDoctorsBySpeciality,
    getCitesByDoctor,
    getCitesPendingByDoctor,
} = require('../controllers/doctors.controller');
const { uploadImage, getImageByHistorial } = require('../controllers/image.controller');

const {
    newCite,
    getCitesByPatient,
    getCite,
    deleteCite,
    getCitesByPending,
    getAssistedCites
} = require('../controllers/cites.controller');

const { getHistorialByCite, registerMedicament } = require('../controllers/medicament.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

router.get('/', getEspecialidad);

router.post('/getDoctorsBySpeciality', getDoctorsBySpeciality)

router.get('/turns', getTurnos);

router.post(
    '/newCite',
    [
        check("fecha", "La fecha es obligatoria").notEmpty().isISO8601('yyyy-mm-dd'),
        check("id_usuario", "No existe el paciente").notEmpty().isNumeric(),
        check("id_doctor", "No existe el doctor").notEmpty().isNumeric(),
        check("id_disponibilidad", "No ha seleccionado un turno").notEmpty().isNumeric(),
        validarCampos,
    ],
    newCite
);

router.post('/citesByPatient', getCitesByPatient);
router.get('/citesByDoctor', getCitesByDoctor);
router.get(
    '/getAssistedCites',
    [
        check("id_usuario", "El id no es válido").isNumeric(),
        validarCampos
    ],
    getAssistedCites
);

router.get(
    '/cite/:id',
    [
        check('id', 'El id pasada no es válido').isNumeric().notEmpty(),
        validarCampos
    ],
    getCite
)

router.patch(
    '/cite/:id',
    [
        check('id', 'El id pasada no es válido').isNumeric().notEmpty(),
        validarCampos
    ],
    deleteCite
)


router.post(
    '/pendingByPatient',
    [
        check("id_usuario", "El id debe ser un número").isNumeric(),
        validarCampos
    ],
    getCitesByPending
);

router.get(
    '/pendingByDoctor',
    [
        check("id_usuario", "El id no es válido").isNumeric(),
        validarCampos
    ],
    getCitesPendingByDoctor
);

router.post(
    '/uploadImage',
    [
        check('id_receta', 'El id no es válido').notEmpty().isNumeric(),
        validarCampos
    ],
    uploadImage
);

router.get(
    '/getImageByHistorial',
    [
        check('id_receta', 'El id no es válido').notEmpty().isNumeric(),
        validarCampos
    ],
    getImageByHistorial
)

router.get('/getHistorialByCite', getHistorialByCite)
router.post(
    '/registerMedicament',
    [
        check('id_cita', 'El id no es válido').notEmpty().isNumeric(),
        check('descripcion', 'La descripción es obligatoria').notEmpty(),
        validarCampos
    ],
    registerMedicament
);

module.exports = router;