const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
// Controladores
const { login, reload } = require('../controllers/auth')
// Validadores
const { validarCampos } = require('../validators/validateCampos')
const { validarJWT } = require('../helpers/validar-jwt')

router.post('/login', [
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validarCampos,
    ], 
login)

router.post('/reload', [
    validarJWT,
    ], 
reload)

module.exports = router
