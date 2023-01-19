const express = require('express')
const router = express.Router()
// Controladores
const periodoController = require('../controllers/periodo')
// Validadores
const validatePeriodo = require('../validators/validatePeriodo')


router.get('/', periodoController.getAllPeriodo)
router.post('/create', validatePeriodo.validatePeriodo, periodoController.createPeriodo)
router.post('/find', periodoController.findPeriodo)
router.put('/update', validatePeriodo.validatePeriodo, periodoController.updatePeriodo)
router.delete('/delete', periodoController.deletePeriodo)

module.exports = router