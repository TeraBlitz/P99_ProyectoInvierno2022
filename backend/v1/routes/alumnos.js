const express = require('express')
const router = express.Router()
// Controladores
const alumnoController = require('../controllers/alumnos')
// Validadores
const { validateAlumno } = require('../validators/validateAlumno')
const { validarJWT } = require('../helpers/validar-jwt')
const { validarRolAdmin } = require('../helpers/validarRolAdmin')

router.get('/', [
    validarJWT,
    validarRolAdmin,
], alumnoController.getAllAlumno)
router.post('/create', [
    validarJWT,
    validateAlumno, // Schema
], alumnoController.createAlumno)
router.put('/update', [
    validarJWT,
    validateAlumno, // Schema
], alumnoController.updateAlumno)
router.delete('/delete', [
    validarJWT,
], alumnoController.deleteAlumno)
router.post('/find', [
    validarJWT,
], alumnoController.findAlumno)

module.exports = router
