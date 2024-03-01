import express from 'express'
import { getAllAlumnoClases, createAlumnoClases, updateAlumnoClases, deleteAlumnoClases, getByAlumno } from '../controllers/alumnoClases.js'
import { validateAlumnoClase } from '../validators/validateAlumnoClases.js'
import { alumnoExiste, claseExiste, periodoExiste, alumnoClaseNoExiste, alumnoNoExcedeCursos, alumnoNoExcedeIdiomas, claseTieneCupo, validateTimeOfRegistration } from '../helpers/dbValidators.js'

const router = express.Router()

router.get('/', getAllAlumnoClases)
router.get('/getByAlumno/:idAlumno',alumnoExiste, getByAlumno)
router.post('/create', [
    validateAlumnoClase, // Schema
    alumnoExiste,
    claseExiste,
    periodoExiste,
    alumnoClaseNoExiste,
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo,
    validateTimeOfRegistration
], createAlumnoClases)
router.put('/update', validateAlumnoClase, updateAlumnoClases)
router.delete('/delete', deleteAlumnoClases)

export default router