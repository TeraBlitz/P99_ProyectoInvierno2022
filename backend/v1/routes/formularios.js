import express from 'express'
import { getFormularioById, getAllFormularios } from '../controllers/formularios.js' 

const router = express.Router()

router.get('/', getAllFormularios)
router.get('/:id', getFormularioById)

export default router