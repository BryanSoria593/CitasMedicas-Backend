const { Router } = require('express')
const router = Router()
const { getEspecialidad, getTurnos } = require('../controllers/available.controller')
const { validateFields } = require('../middlewares/validare-fields')
const { check } = require('express-validator')

router.get('/', getEspecialidad)
router.post(
    '/turns',
    [
        check('date', 'La fecha es obligatoria').notEmpty(),
        check('date', 'La fecha debe ser en formato YYYY-MM-DD').isISO8601(),
        validateFields
    ],
    getTurnos
)
module.exports = router
