import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"


const COLLECTION_NAME = "asistencias"

async function getAllAsistencia(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();
        // console.log(JSON.stringify(result))
        res.send(JSON.stringify(result));
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllAsistencia
// getAllAsistencia().catch(console.dir);

// Create
async function createAsistencia(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear un Doc
        const doc = [
            {
                idUsuario: req.body.idUsuario,
                idClase: req.body.idClase,
                fecha: req.body.fecha,
                asistio: req.body.asistio,
            },
        ];

        const result = await collection.insertMany(doc);
        for (i = 0; i < result.insertedCount; i++)
        res.send(
            `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        );
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test createAsistencia
// createAsistencia().catch(console.dir);

// Update
async function updateAsistencia(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
            $set: {
                idUsuario: req.body.idUsuario,
                idClase: req.body.idClase,
                fecha: req.body.fecha,
                asistio: req.body.asistio,
            },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
        `Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateAsistencia ERROR: ${err}`);
    }
}
// Test updateAsistencia
// updateAsistencia().catch(console.dir);

// Delete
async function deleteAsistencia(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // ID documento a eliminar
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };

        const result = await collection.deleteMany(idDoc);
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {
        res.send(`Documento con _id: ${idDoc._id} eliminado con exito.`);
        } else {
        res.send("Ningun documento encontrado. 0 Documentos eliminados.");
        }
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}
// Test deleteAsistencia
// deleteAsistencia().catch(console.dir);

// Metodo find
async function findAsistencia(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        let query = "";
        let key = "";
        let value = "";

        if (req.body.idUsuario) {
        key = "idUsuario";
        value = req.body.idUsuario;
        query = { idUsuario: value };
        } else if (req.body.idClase) {
        key = "idClase";
        value = req.body.idClase;
        query = { idClase: value };
        } else if (req.body.fecha) {
        key = "fecha";
        value = req.body.fecha;
        query = { fecha: value };
        } else if (req.body.asistio) {
        key = "asistio";
        value = req.body.asistio;

        query = { asistio: value };
        } else {
        throw "parametros invalidos";
        }
        const result = await collection.find(query).toArray();
        if (result == "") {
        res.send(`Ninguna clase encontrada con ${key} : ${value}`);
        } else {
        res.send(result);
        }
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

export {
    getAllAsistencia,
    createAsistencia,
    updateAsistencia,
    deleteAsistencia,
    findAsistencia,
};
