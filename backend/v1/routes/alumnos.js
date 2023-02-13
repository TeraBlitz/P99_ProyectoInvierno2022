import express from 'express'
import { validateAlumno } from '../validators/validateAlumno.js'
import { getAllAlumno, createAlumno, updateAlumno, deleteAlumno, findAlumno } from '../controllers/alumnos.js'

const router = express.Router()

router.get('/', getAllAlumno)
router.post('/create', validateAlumno, createAlumno)
router.post('/find', findAlumno)
router.put('/update', validateAlumno, updateAlumno)
router.delete('/delete', deleteAlumno)

export default router