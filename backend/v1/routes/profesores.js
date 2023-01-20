const express = require('express')
const router = express.Router()
// Controladores
const profesorController = require('../controllers/profesores')
// Validadores
const validateProfesor = require('../validators/validateProfesor')

router.get('/', profesorController.getAllProfesor)
router.post('/create', validateProfesor.validateProfesor, profesorController.createProfesor)
router.put('/update', validateProfesor.validateProfesor, profesorController.updateProfesor)
router.delete('/delete', profesorController.deleteProfesor)

module.exports = router