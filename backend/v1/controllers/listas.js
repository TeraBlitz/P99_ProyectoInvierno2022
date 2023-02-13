import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"

const COLLECTION_NAME = "listas"

async function getAllLista(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllLista
// getAllLista().catch(console.dir);

// Create
async function createLista(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear un Doc
        const doc = [
        {
            idAlumno: req.body.idAlumno,
            idClase: req.body.idClase,
            time_stamp: req.body.time_stamp,
            status: req.body.status,
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
// Test createLista
// createLista().catch(console.dir);

// Update
async function updateLista(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
        $set: {
            idAlumno: req.body.idAlumno,
            idClase: req.body.idClase,
            time_stamp: req.body.time_stamp,
            status: req.body.status,
        },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
        `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateLista ERROR: ${err}`);
    }
}
// Test updateLista
// updateLista().catch(console.dir);

// Delete
async function deleteLista(req, res) {
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
// Test deleteLista
// deleteLista().catch(console.dir);

//find
async function findLista(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        let query = "";
        let key = "";
        let value = "";
        if (req.body.idAlumno) {
        key = "idAlumno";
        value = req.body.idAlumno;
        query = { idAlumno: value };
        } else if (req.body.idClase) {
        key = "idClase";
        value = req.body.idClase;
        query = { idClase: value };
        } else if (req.body.lugar_de_espera) {
        key = "lugar_de_espera";
        value = req.body.lugar_de_espera;
        query = { lugar_de_espera: value };
        } else if (req.body.status) {
        key = "status";
        value = req.body.status;

        query = { status: value };
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
    getAllLista,
    createLista,
    updateLista,
    deleteLista,
    findLista,
};
