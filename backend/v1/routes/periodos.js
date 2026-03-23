import express from 'express'
import { getAllPeriodo, getAllStudents, createPeriodo, findPeriodo, updatePeriodo, deletePeriodo } from '../controllers/periodo.js'
import { validatePeriodo } from '../validators/validatePeriodo.js'

const router = express.Router()

router.get('/', getAllPeriodo)
router.post('/create', validatePeriodo, createPeriodo)
router.post('/find', findPeriodo)
router.put('/update', validatePeriodo, updatePeriodo)
router.delete('/delete', deletePeriodo)
router.get('/getStudents', getAllStudents)

export default router