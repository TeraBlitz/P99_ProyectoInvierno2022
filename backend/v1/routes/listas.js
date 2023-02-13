import express from 'express'
import { getAllLista, createLista, findLista, updateLista, deleteLista } from '../controllers/listas.js'
import { validateLista } from '../validators/validateLista.js'

const router = express.Router()

router.get('/', getAllLista)
router.post('/create', validateLista, createLista)
router.post('/find',  findLista)
router.put('/update', validateLista, updateLista)
router.delete('/delete', deleteLista)

export default router