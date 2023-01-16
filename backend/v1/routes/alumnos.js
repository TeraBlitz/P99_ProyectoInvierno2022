const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// Controladores
const alumnoController = require('../controllers/alumnos')
// Validadores
const validateAlumno = require('../validators/validateAlumno')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', alumnoController.getAllAlumno)
router.post('/create', urlencodedParser, validateAlumno.validateAlumno, alumnoController.createAlumno)
router.put('/update', urlencodedParser, validateAlumno.validateAlumno, alumnoController.updateAlumno)
router.delete('/delete', urlencodedParser, alumnoController.deleteAlumno)

module.exports = router