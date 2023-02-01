const express = require('express')
const router = express.Router()
// Controladores
const alumnoClaseController = require('../controllers/alumnoClases')
// Validadores
const { validateAlumnoClase } = require('../validators/validateAlumnoClases')
const { 
    alumnoExiste, 
    claseExiste, 
    periodoExiste, 
    alumnoClaseNoExiste, 
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo
} = require('../helpers/dbValidators')


router.get('/', alumnoClaseController.getAllAlumnoClases)
router.post('/create', [
    validateAlumnoClase, // Schema
    alumnoExiste,
    claseExiste,
    periodoExiste,
    alumnoClaseNoExiste,
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo
], alumnoClaseController.createAlumnoClases)
router.put('/update', validateAlumnoClase, alumnoClaseController.updateAlumnoClases)
router.delete('/delete', alumnoClaseController.deleteAlumnoClases)

module.exports = router