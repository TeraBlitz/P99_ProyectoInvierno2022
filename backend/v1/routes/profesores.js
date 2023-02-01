const express = require('express')
const router = express.Router()
// Controladores
const profesorController = require('../controllers/profesores')
// Validadores
const { validateProfesor } = require('../validators/validateProfesor')
const { correoProfesorNoExiste, matriculaProfesorNoExiste, numeroProfesorNoExiste, idUserExiste } = require('../helpers/dbValidators')

router.get('/', profesorController.getAllProfesor)
router.post('/create', [
    validateProfesor, // Schema
    correoProfesorNoExiste,
    matriculaProfesorNoExiste,
    numeroProfesorNoExiste,
    idUserExiste,
], profesorController.createProfesor)
router.put('/update', validateProfesor, profesorController.updateProfesor)
router.delete('/delete', profesorController.deleteProfesor)

module.exports = router