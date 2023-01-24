const express = require('express')
const router = express.Router()
// Controladores
const csvController = require('../controllers/csv')

router.post('/subirClases', csvController.subirClases)


module.exports = router