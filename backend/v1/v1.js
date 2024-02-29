import express from 'express'
import csv from './routes/csv.js'
import user from'./routes/users.js'
import clase from './routes/clases.js'
import periodo from './routes/periodos.js'
import asistencia from './routes/asistencias.js'
import alumno from './routes/alumnos.js'
import lista from './routes/listas.js'
import profesor from './routes/profesores.js'
import alumnoClase from './routes/alumnoClases.js'
import formulario from './routes/formularios.js'
import alumnoFormulario from './routes/alumnoFormularios.js'
import { auth } from 'express-oauth2-jwt-bearer'

const v1 = express.Router()

const jwtCheck = auth({
    audience: 'https://dev-0c7l137a.auth0.com/api/v2/',
    issuerBaseURL: 'https://dev-0c7l137a.auth0.com/',
    tokenSigningAlg: 'RS256'
});

//v1.use(jwtCheck)
// Rutas Excels
v1.use('/csv', csv)

// Rutas Modelos
v1.use('/users', user)
v1.use('/clases', clase)
v1.use('/periodos', periodo)
v1.use('/asistencias', asistencia)
v1.use('/alumnos', alumno)
v1.use('/listas', lista)
v1.use('/profesores', profesor)
v1.use('/alumnoClases', alumnoClase)
v1.use('/formularios', formulario)
v1.use('/alumnoFormularios', alumnoFormulario)

export default v1