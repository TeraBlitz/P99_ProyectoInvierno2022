const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
// Controladores
const { login } = require('../controllers/auth')
// Validadores
const { validarCampos } = require('../validators/validateCampos')

router.post('/login', [
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validarCampos,
    ], 
login)

module.exports = router
