import express from 'express'
import { getAllProfesor, createProfesor, updateProfesor, deleteProfesor} from '../controllers/profesores.js'
import { validateProfesor } from '../validators/validateProfesor.js'
import { correoProfesorNoExiste, matriculaProfesorNoExiste, numeroProfesorNoExiste, idUserExiste } from '../helpers/dbValidators.js'

const router = express.Router()

router.get('/', getAllProfesor)
router.post('/create', [
    validateProfesor, // Schema
    correoProfesorNoExiste,
    matriculaProfesorNoExiste,
    numeroProfesorNoExiste,
    idUserExiste,
], createProfesor)
router.put('/update', validateProfesor, updateProfesor)
router.delete('/delete', deleteProfesor)

export default router