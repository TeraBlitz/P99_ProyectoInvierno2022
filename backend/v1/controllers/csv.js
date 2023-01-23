const { clientCon } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function subirClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear el arreglo de Docs
        let docs = []
        for (let i = 0; i < req.body.length; i++) {
            docs[i] = {}
            docs[i].clave = req.body[i].clave
            docs[i].area = req.body[i].area
            docs[i].modalidad = req.body[i].modalidad
            docs[i].nombre_curso = req.body[i].nombre_curso
            docs[i].nivel = req.body[i].nivel
            docs[i].matriculaMaestro = req.body[i].matriculaMaestro
            docs[i].clavePeriodo = req.body[i].clavePeriodo
            docs[i].edad_minima = req.body[i].edad_minima
            docs[i].edad_maxima = req.body[i].edad_maxima
            docs[i].lunes = req.body[i].lunes
            docs[i].martes = req.body[i].martes
            docs[i].miercoles = req.body[i].miercoles
            docs[i].jueves = req.body[i].jueves
            docs[i].viernes = req.body[i].viernes
            docs[i].sabado = req.body[i].sabado
            docs[i].cupo_maximo = req.body[i].cupo_maximo
            docs[i].cupo_actual = req.body[i].cupo_actual
        }
    
        const result = await collection.insertMany(docs);
        for (i = 0; i < result.insertedCount; i++)
        res.send(
            `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        );
    } catch (err) {
        res.send(`ERROR: ${err}`);
    } finally {
        await client.close();
    }
}

module.exports = {
    subirClases,
};
