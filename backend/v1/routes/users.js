const express = require('express')
const router = express.Router()
// Controladores
const userController = require('../controllers/users')
// Validadores
const { validateUser } = require('../validators/validateUser')
const { correoNoExiste, userNameNoExiste } = require('../helpers/dbValidators')
const { validarJWT } = require('../helpers/validar-jwt')
const { validarRolAdmin } = require('../helpers/validarRolAdmin')

router.get('/', [
    validarJWT,
    validarRolAdmin
], userController.getAllUser)
router.post('/create', [
    validarJWT,
    validarRolAdmin,
    validateUser, // Schema
    correoNoExiste,
    userNameNoExiste,
], userController.createUser)
router.put('/update/:id', [
    validarJWT,
    validateUser, // Schema
], userController.updateUser)
router.delete('/delete/:id', [
    validarJWT,
    validarRolAdmin,
], userController.deleteUser)
router.post('/find/:id', userController.findUser)

module.exports = router
