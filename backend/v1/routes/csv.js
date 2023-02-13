import express from 'express'
import { subirClases, subirProfesores } from '../controllers/csv.js'


const router = express.Router()

// Controladores
router.post('/subirClases', subirClases)
router.post('/subirProfesores', subirProfesores)


export default router
