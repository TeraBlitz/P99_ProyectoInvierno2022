const express = require('express')
const router = express.Router()
// Controladores
const alumnoClaseController = require('../controllers/alumnoClases')
// Validadores
const { validateAlumnoClase } = require('../validators/validateAlumnoClases')
const { validarJWT } = require('../helpers/validar-jwt')
const { validarRolAdmin } = require('../helpers/validarRolAdmin')
const { 
    alumnoExiste, 
    claseExiste, 
    periodoExiste, 
    alumnoClaseNoExiste, 
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo
} = require('../helpers/dbValidators')


router.get('/', [
    validarJWT,
    validarRolAdmin,
], alumnoClaseController.getAllAlumnoClases)
router.post('/create', [
    validarJWT,
    validateAlumnoClase, // Schema
    alumnoExiste,
    claseExiste,
    periodoExiste,
    alumnoClaseNoExiste,
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo
], alumnoClaseController.createAlumnoClases)
router.put('/update', [
    validarJWT,
    validateAlumnoClase, // Schema
], alumnoClaseController.updateAlumnoClases)
router.delete('/delete', [
    validarJWT,
], alumnoClaseController.deleteAlumnoClases)
router.post('/find', [
    validarJWT,
], alumnoClaseController.findAlumnoClases)

module.exports = router