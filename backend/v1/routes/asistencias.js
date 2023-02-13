import express from 'express'
import { getAllAsistencia, createAsistencia, findAsistencia, updateAsistencia, deleteAsistencia } from '../controllers/asistencias.js'
import { validateAsistencia } from '../validators/validateAsistencia.js'

const router = express.Router()


router.get('/', getAllAsistencia)
router.post('/create', validateAsistencia, createAsistencia)
router.post('/find',  findAsistencia)
router.put('/update', validateAsistencia, updateAsistencia)
router.delete('/delete', deleteAsistencia)

export default router