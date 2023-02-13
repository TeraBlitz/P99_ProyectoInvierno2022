import express from 'express'
import { getAllPeriodo, createPeriodo, findPeriodo, updatePeriodo, deletePeriodo } from '../controllers/periodo.js'
import { validatePeriodo } from '../validators/validatePeriodo.js'

const router = express.Router()

router.get('/', getAllPeriodo)
router.post('/create', validatePeriodo, createPeriodo)
router.post('/find', findPeriodo)
router.put('/update', validatePeriodo, updatePeriodo)
router.delete('/delete', deletePeriodo)

export default router