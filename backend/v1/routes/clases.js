const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// Controladores
const claseController = require('../controllers/clases')
// Validadores
const validateClase = require('../validators/validateClases')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', claseController.getAllClase)
router.post('/create', urlencodedParser, validateClase.validateClase, claseController.createClase)
router.put('/update', urlencodedParser, validateClase.validateClase, claseController.updateClase)
router.delete('/delete', urlencodedParser, claseController.deleteClase)

module.exports = router