const express = require('express')
const router = express.Router()
// Controladores
const claseController = require('../controllers/clases')
// Validadores
const validateClase = require('../validators/validateClases')


router.get('/', claseController.getAllClase)
router.post('/create', validateClase.validateClase, claseController.createClase)
router.post('/find', claseController.findClase)
router.put('/update', validateClase.validateClase, claseController.updateClase)
router.delete('/delete', claseController.deleteClase)

module.exports = router