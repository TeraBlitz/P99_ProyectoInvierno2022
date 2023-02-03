const express = require('express')
const router = express.Router()
// Controladores
const periodoController = require('../controllers/periodo')
// Validadores
const { validatePeriodo } = require('../validators/validatePeriodo')
const { validarJWT } = require('../helpers/validar-jwt')
const { validarRolAdmin } = require('../helpers/validarRolAdmin')

router.get('/', [
    validarJWT,
    validarRolAdmin,
], periodoController.getAllPeriodo)
router.post('/create', [
    validarJWT,
    validarRolAdmin,
    validatePeriodo, // Schema
], periodoController.createPeriodo)
router.put('/update', [
    validarJWT,
    validarRolAdmin,
    validatePeriodo, // Schema
], periodoController.updatePeriodo)
router.delete('/delete', [
    validarJWT,
    validarRolAdmin,
], periodoController.deletePeriodo)
router.post('/find', [
    validarJWT,
    validarRolAdmin,
], periodoController.findPeriodo)

module.exports = router