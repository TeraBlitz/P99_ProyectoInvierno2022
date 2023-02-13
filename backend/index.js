import cors from 'cors'
import express from 'express'
import path from "path"
import { connection } from './v1/connection.js'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import v1 from './v1/v1.js'

dotenv.config()
const app = express()
const port = process.env.PORT

// Testeo de la Conexion
connection().catch(console.error);

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Utilerias
app.use(cors());
app.use(urlencodedParser);
app.use('/v1', v1);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, ()=>{
    console.log(`Aplicacion corriendo | Puerto:${port}`)
})

// console.log('Probando, 1, 2, 3, Hola Mundo')