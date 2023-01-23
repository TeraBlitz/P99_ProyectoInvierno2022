const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
// Controladores
const {login} = require('../controllers/auth')
// Validadores
const {validarCampos} = require('../validators/validateCampos')

router.post('/login', [
    check('correo', 'El correo es obligatorio o formato invalido de correo.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validarCampos
], login)

module.exports = router
