const {connection} = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb");

/* // Creamos el cliente
const con = connection() */

// Connection URI.
// mongodb://localhost:27017
const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`
// Crear un nuevo MongoClient
const client = new mongodb.MongoClient(uri);

async function getAllClase(req, res){
    try{
        await client.connect();
        const database = client.db(mongodbInf.database)
        const collection = database.collection("clases")

        const result = await collection.find().toArray()
        res.send(result)
    }catch(err){
        res.send(`ERROR: ${err}`)
    }finally{
        await client.close();
    }
}
// Test getAllClase
// getAllClase().catch(console.dir);


// Create
async function createClase(req, res){
    try{
        await client.connect();
        const database = client.db(mongodbInf.database)
        const collection = database.collection("clases")

        // Crear un Doc
        const doc = {
            nombre_curso: req.body.nombre_curso,
            nivel: req.body.nivel,
            idMaestro: req.body.idMaestro,
            frecuencia_semanal: req.body.frecuencia_semanal,
            cupo_maximo: req.body.cupo_maximo
        }

        const result = await collection.insertOne(doc)
        res.send(`Un documeno fue insertado con el ID: ${result.insertedId}`)
    }catch(err){
        res.send(`ERROR: ${err}`)
    }finally{
        await client.close();
    }
}
// Test createClase
// createClase().catch(console.dir);


// Update
async function updateClase(req, res){
    try {
        await client.connect();
        const database = client.db(mongodbInf.database)
        const collection = database.collection("clases")

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id)
        }
        const doc = {
            $set: {
                nombre_curso: req.body.nombre_curso,
                nivel: req.body.nivel,
                idMaestro: req.body.idMaestro,
                frecuencia_semanal: req.body.frecuencia_semanal,
                cupo_maximo: req.body.cupo_maximo
            }
        }

        const result = await collection.findOneAndUpdate(idDoc, doc)
        res.send(`Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`)
    }catch(err){
        res.send(`updateClase ERROR: ${err}`)
    }finally{
        await client.close();
    }
}
// Test updateClase
// updateClase().catch(console.dir);


// Delete
async function deleteClase(req, res){
    try {
        await client.connect();
        const database = client.db(mongodbInf.database)
        const collection = database.collection("clases")

        // ID documento a eliminar
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id)
        }

        const result = await collection.deleteOne(idDoc)
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {
            res.send(`Documento con _id: ${idDoc._id} eliminado con exito.`)
        } else {
            res.send("Ningun documento encontrado. 0 Documentos eliminados.")
        }
    }catch(err){
        console.log(`ERROR: ${err}`)
    }finally{
        await client.close()
    }
}
// Test deleteClase
// deleteClase().catch(console.dir);

module.exports = {getAllClase, createClase, updateClase, deleteClase}