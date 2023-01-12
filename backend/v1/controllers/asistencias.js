/* const Asistencia = require('../models/asistencias') */
const {connection} = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb");

/* // Creamos el cliente
const client = connection() */

// Connection URI.
// mongodb://localhost:27017
const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`
// Crear un nuevo MongoClient
const client = new mongodb.MongoClient(uri);

async function getAllAsistencia(req, res){
    try{
        const database = client.db(mongodbInf.database)
        const collection = database.collection("asistencias")

        const result = await collection.find()
        console.log(JSON.stringify(result))
    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally{
        await client.close();
    }
}


// Create
async function createAsistencia(req, res){
    try{
        const database = client.db(mongodbInf.database)
        const collection = database.collection("asistencias")

        // Crear un Doc de Ejemplo
        const doc = {
            nombre: "Mario 5",
            apellidos: "Guerra 5",
        }

        const result = await collection.insertOne(doc)
        console.log(`Un documeno fue insertado con el ID: ${result.insertedId}`)

    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally{
        await client.close();
    }
}
// Test createAsistencia
// createAsistencia().catch(console.dir);


// Update
async function updateAsistencia(req, res){
    try {
        const database = client.db(mongodbInf.database)
        const collection = database.collection("asistencias")

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body.id)
        }
        const doc = {
            $set: { 
                nombre: req.body.nombre,
                apellidos: req.body.apellidos
            }
        }

        // Crear documento actualizado test
        const idDocTest = {
            _id: new mongodb.ObjectId("63bf608c8391d717b9d65739"),
        }
        const docTest = {
            $set: { 
                nombre: "Jorge",
                apellidos: "Tato"
            }
        }

        const result = await collection.findOneAndUpdate(idDocTest,docTest)
        console.log(`Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`)
    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally{
        await client.close();
    }
}
// Test updateAsistencia
// updateAsistencia().catch(console.dir);


// Delete
async function deleteAsistencia(req, res){
    try {
        const database = client.db(mongodbInf.database)
        const collection = database.collection("asistencias")

        /* // ID documento a eliminar
        const idDoc = {
            _id: new mongodb.ObjectId(req.body.id)
        } */

        // CID documento a eliminar test
        const idDocTest = {
            _id: new mongodb.ObjectId("63bf6107b5823dbe5830157d"),
        }

        const result = await collection.deleteOne(idDocTest)
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {
            console.log(`Documento con _id: ${idDocTest._id} eliminado con exito.`)
        } else {
            console.log("Ningun documento encontrado. 0 Documentos eliminados.")
        }
    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally{
        await client.close()
    }
}
// Test deleteAsistencia
// deleteAsistencia().catch(console.dir);

module.exports = {getAllAsistencia, createAsistencia, updateAsistencia, deleteAsistencia}

/* // create
const createAsistencia = (req, res)=>{
    // Sending request to create a data
    db.collection('data').insertOne({ text: req.body.text }, function (
        err,
        info
    ) {
        res.json(info.ops[0])
    })
} */

/* // Update
const updateAsistencia = (req, res)=>{
    // Actualizar por su ID
    db.collection('asistencias').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.body.id) },
        { $set: { text: req.body.text } },
        function () {
            res.send('Actualizado con exito!')
        }
    )
} */

/* // Delete
const deleteAsistencia = (req, res)=>{
    // Eliminar por su ID
    db.collection('asistencias').deleteOne(
        { _id: new mongodb.ObjectId(req.body.id) },
        function () {
        res.send('Eliminado con exito!')
        }
    )
} */