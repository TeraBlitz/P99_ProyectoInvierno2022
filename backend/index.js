const cors = require('cors')
const express = require('express')
const { connection } = require('./v1/connection.js')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Rutas Autentificaciones
const auth = require('./v1/routes/auth')
// Rutas de los modelos
const user = require('./v1/routes/users')
const clase = require('./v1/routes/clases')
const periodo = require('./v1/routes/periodos')
const asistencia = require('./v1/routes/asistencias')
const alumno = require('./v1/routes/alumnos')
const lista = require('./v1/routes/listas')

// Testeo de la Conexion
connection().catch(console.error);

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/v1', (req, res)=>{
    res.send('Bienvenido | v1')
})
// Utilerias
app.use(cors());
app.use(urlencodedParser);
// Autentificaciones
app.use('/v1/auth', auth)
// Rutas Modelos
app.use('/v1/users', user)
app.use('/v1/clases', clase)
app.use('/v1/periodos', periodo)
app.use('/v1/asistencias', asistencia)
app.use('/v1/alumnos', alumno)
app.use('/v1/listas', lista)

app.listen(port, ()=>{
    console.log(`Aplicacion corriendo | Puerto:${port}`)
})

// console.log('Probando, 1, 2, 3, Hola Mundo')