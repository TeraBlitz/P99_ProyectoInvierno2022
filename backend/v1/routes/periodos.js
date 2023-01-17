const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// Controladores
const periodoController = require('../controllers/periodo')
// Validadores
const validatePeriodo = require('../validators/validatePeriodo')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', periodoController.getAllPeriodo)
router.post('/create', urlencodedParser, validatePeriodo.validatePeriodo, periodoController.createPeriodo)
router.put('/update', urlencodedParser, validatePeriodo.validatePeriodo, periodoController.updatePeriodo)
router.delete('/delete', urlencodedParser, periodoController.deletePeriodo)

module.exports = router