const express = require('express')
const router = express.Router()
// Controladores
const alumnoClaseController = require('../controllers/alumnoClases')
// Validadores
const { validateAlumnoClase } = require('../validators/validateAlumnoClases')


router.get('/', alumnoClaseController.getAllAlumnoClases)
router.post('/create', validateAlumnoClase, alumnoClaseController.createAlumnoClases)
router.put('/update', validateAlumnoClase, alumnoClaseController.updateAlumnoClases)
router.delete('/delete', alumnoClaseController.deleteAlumnoClases)

module.exports = router