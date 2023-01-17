const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// Controladores
const asistenciaController = require('../controllers/asistencias')
// Validadores
const validateAsistencia = require('../validators/validateAsistencia')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', asistenciaController.getAllAsistencia)
router.post('/create', urlencodedParser, validateAsistencia.validateAsistencia, asistenciaController.createAsistencia)
router.put('/update', urlencodedParser, validateAsistencia.validateAsistencia, asistenciaController.updateAsistencia)
router.delete('/delete', urlencodedParser, asistenciaController.deleteAsistencia)

module.exports = router