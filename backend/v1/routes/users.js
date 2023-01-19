const express = require('express')
const router = express.Router()
// Controladores
const userController = require('../controllers/users')
// Validadores
const validateUser = require('../validators/validateUser')

router.get('/', userController.getAllUser)
router.post('/create', validateUser.validateUser, userController.createUser)
router.put('/update', validateUser.validateUser, userController.updateUser)
router.delete('/delete', userController.deleteUser)

module.exports = router