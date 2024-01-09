import express from 'express'
import {getAllClase, createClase, updateClase, deleteClase, findClase ,getClasesDisp_ByPeriod,isClaseAvailable} from '../controllers/clases.js'
import { validateClase } from '../validators/validateClases.js'
import { claseNoExiste, clavePeriodoExiste, matriculaProfesorExiste} from '../helpers/dbValidators.js'


const router = express.Router()
// Controladores
// Validadores


router.get('/', getAllClase)
router.post('/create', [
    validateClase, // Schema
    claseNoExiste,
    clavePeriodoExiste,
    matriculaProfesorExiste,
], createClase)
router.put('/update', validateClase, updateClase)
router.delete('/delete', deleteClase)
router.post('/find', findClase)
router.get('/getClasesDisp_ByPeriod/:period/:alumno', getClasesDisp_ByPeriod);
router.get('/isClaseAvailable/:periodo/:clase', isClaseAvailable);


export default router