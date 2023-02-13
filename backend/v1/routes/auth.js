import express from 'express'
import { check } from 'express-validator'
import { login, reload } from '../controllers/auth.js'
import { validarCampos } from '../validators/validateCampos.js'
import { validarJWT } from '../helpers/validar-jwt'

const router = express.Router()
// Controladores
// Validadores

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
