const express = require('express')
const router = express.Router()
// Controladores
const userController = require('../controllers/users')
// Validadores
const { validateUser } = require('../validators/validateUser')
const { correoNoExiste, userNameNoExiste } = require('../helpers/dbValidators')

router.get('/', userController.getAllUser)
router.post('/create', [
    validateUser,
    correoNoExiste,
    userNameNoExiste,
], userController.createUser)
router.put('/update', validateUser, userController.updateUser)
router.delete('/delete', userController.deleteUser)
router.post('/find', userController.findUser)

module.exports = router
