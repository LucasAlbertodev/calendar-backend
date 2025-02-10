/*
Rutas de usuario / Auth
host + /api/auth
*/

const { Router } = require('express');
const {check} = require('express-validator')
const router = Router();

const { validateField } = require('../middlewares/validate-fields');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const {validateJWT} = require ('../middlewares/validate-jwt')

//routes
router.post('/new',[
    //middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validateField

] ,createUser);

router.post('/',[
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validateField

], loginUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;

