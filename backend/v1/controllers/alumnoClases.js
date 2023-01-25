const { clientCon } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function getAllAlumnoClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("alumnoClases");

        const result = await collection.find().toArray();

        res.json({
            msg: 'Consulta realizada con exito.',
            data: result
        });
    } catch (err) {
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });

    }
}
// Test getAllAlumnoClases
// getAllAlumnoClases().catch(console.dir);

// Create
async function createAlumnoClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("alumnoClases");

        // Crear un Doc
        const doc = [
        {
            idAlumno: new mongodb.ObjectId(req.body.idAlumno),
            idClase: new mongodb.ObjectId(req.body.idClase),
            idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
        },
        ];

        const result = await collection.insertMany(doc);
        for (i = 0; i < result.insertedCount; i++)
        res.json({
            msg: `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        });
    } catch (err) {
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    } finally {
        await client.close();
    }
}
// Test createAlumnoClases
// createAlumnoClases().catch(console.dir);

// Update
async function updateAlumnoClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("alumnoClases");

        // Crear el documento actualizado
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
        $set: {
            idAlumno: new mongodb.ObjectId(req.body.idAlumno),
            idClase: new mongodb.ObjectId(req.body.idClase),
            idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
        },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.json({
            msg: `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        });
    } catch (err) {
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    } finally {
        await client.close();
    }
}
// Test updateAlumnoClases
// updateAlumnoClases().catch(console.dir);

// Delete
async function deleteAlumnoClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("alumnoClases");

        // ID documento a eliminar
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };

        const result = await collection.deleteMany(idDoc);
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {
            res.json({
                msg: `Documento con _id: ${idDoc._id} eliminado con exito.`
            });
        } else {
            res.json({
                msg: "Ningun documento encontrado. 0 Documentos eliminados."
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    } finally {
        await client.close();
    }
}
// Test deleteAlumnoClases
// deleteAlumnoClases().catch(console.dir);


module.exports = {
    getAllAlumnoClases,
    createAlumnoClases,
    updateAlumnoClases,
    deleteAlumnoClases,
}
