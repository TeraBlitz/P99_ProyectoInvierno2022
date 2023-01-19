const express = require('express')
const router = express.Router()
// Controladores
const asistenciaController = require('../controllers/asistencias')
// Validadores
const validateAsistencia = require('../validators/validateAsistencia')


router.get('/', asistenciaController.getAllAsistencia)
router.post('/create', validateAsistencia.validateAsistencia, asistenciaController.createAsistencia)
router.post('/find',  asistenciaController.findAsistencia)
router.put('/update', validateAsistencia.validateAsistencia, asistenciaController.updateAsistencia)
router.delete('/delete', asistenciaController.deleteAsistencia)

module.exports = router