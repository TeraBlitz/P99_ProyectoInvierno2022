const express = require('express')
const router = express.Router()
// Controladores
const alumnoController = require('../controllers/alumnos')
// Validadores
const validateAlumno = require('../validators/validateAlumno')

router.get('/', alumnoController.getAllAlumno)
router.post('/create', validateAlumno.validateAlumno, alumnoController.createAlumno)
router.post('/find', alumnoController.findAlumno)
router.put('/update', validateAlumno.validateAlumno, alumnoController.updateAlumno)
router.delete('/delete', alumnoController.deleteAlumno)

module.exports = router
