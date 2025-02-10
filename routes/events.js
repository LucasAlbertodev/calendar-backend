const { Router } = require('express');
const router = Router();
const {isDate} = require('../helpers/isDate')
const {validateField} = require('../middlewares/validate-fields')
const {check} = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvents, deleteEvents } = require('../controllers/events')

//todas tiene que estar validadas
//obtener eventos

router.use(validateJWT);

router.get('/', getEvents);
router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),

    validateField
], createEvent);
router.put('/:id', updateEvents);
router.delete('/:id', deleteEvents);

module.exports = router;