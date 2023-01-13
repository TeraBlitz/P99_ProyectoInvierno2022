const express = require('express')
const { connection } = require('./v1/connection.js')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Rutas de los modelos
const user = require('./v1/routes/users')

// Testeo de la Conexion
connection().catch(console.error);

// Rutas
app.get('/v1', (req, res)=>{
    res.send('Bienvenido | v1')
})
app.use('/v1/users', user)

app.listen(port, ()=>{
    console.log(`Aplicacion corriendo en el puerto: ${port}.`)
})

// console.log('Probando, 1, 2, 3, Hola Mundo')