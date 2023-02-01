const express = require('express')
const router = express.Router()
// Controladores
const claseController = require('../controllers/clases')
// Validadores
const { validateClase } = require('../validators/validateClases')
const { claseNoExiste, clavePeriodoExiste, matriculaProfesorExiste} = require('../helpers/dbValidators')


router.get('/', claseController.getAllClase)
router.post('/create', [
    validateClase, // Schema
    claseNoExiste,
    clavePeriodoExiste,
    matriculaProfesorExiste,
], claseController.createClase)
router.put('/update', validateClase, claseController.updateClase)
router.delete('/delete', claseController.deleteClase)
router.post('/find', claseController.findClase)

module.exports = router