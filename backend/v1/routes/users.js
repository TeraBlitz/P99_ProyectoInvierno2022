const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// Controladores
const userController = require('../controllers/users')
// Validadores
const validateUser = require('../validators/validateUser')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', userController.getAllUser)
router.post('/create', urlencodedParser, validateUser.validateUser, userController.createUser)
router.put('/update', urlencodedParser, validateUser.validateUser, userController.updateUser)
router.delete('/delete', urlencodedParser, userController.deleteUser)

module.exports = router