import express from 'express'
import { insertAlumnoFormularios, getAlumnoFormularios, getAlumnoFormularioById, updateAlumnoFormularios } from "../controllers/alumnoFormularios.js";

const router = express.Router()

router.post('/insert', insertAlumnoFormularios);
router.put('/idAlumno/:idAlumno/idFormulario/:idFormulario', updateAlumnoFormularios);
router.get('/idAlumno/:idAlumno', getAlumnoFormularios);
router.get('/idAlumno/:idAlumno/idFormulario/:idFormulario', getAlumnoFormularioById);

export default router