const express = require('express')
const router = express.Router()
// Controladores
const listaController = require('../controllers/listas')
// Validadores
const validateLista = require('../validators/validateLista')


router.get('/', listaController.getAllLista)
router.post('/create', validateLista.validateLista, listaController.createLista)
router.put('/update', validateLista.validateLista, listaController.updateLista)
router.delete('/delete', listaController.deleteLista)

module.exports = router