import { clientConnect } from "../connection.js";
import { mongodbInf } from "../config.js";

const COLLECTION_NAME = "alumnoFormularios";

async function insertAlumnoFormularios(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const formularioId = req.body.idFormulario;
        const alumnoId = req.body.idAlumno;
        const respuestas = JSON.parse(req.body.answers);
        const formattedRespuestas = {};
        for (const key in respuestas) {
            if (Object.hasOwnProperty.call(respuestas, key)) {
                const originalInnerObject = respuestas[key];
                // Transform the inner object values into an array
                const transformedInnerArray = Object.values(originalInnerObject);
                // Update the transformedObject with the new structure
                formattedRespuestas[key] = transformedInnerArray;
            }
        }

        const doc = {
            idFormulario: formularioId,
            idAlumno: alumnoId,
            answers: formattedRespuestas
        }

        const result = await collection.insertOne(doc);
        res.json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function updateAlumnoFormularios(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const formularioId = req.params.idFormulario;
        const alumnoId = req.params.idAlumno;
        const respuestas = JSON.parse(req.body.answers);
        const formattedRespuestas = {};
        for (const key in respuestas) {
            if (Object.hasOwnProperty.call(respuestas, key)) {
                const originalInnerObject = respuestas[key];
                // Transform the inner object values into an array
                const transformedInnerArray = Object.values(originalInnerObject);
                // Update the transformedObject with the new structure
                formattedRespuestas[key] = transformedInnerArray;
            }
        }

        const doc = {
            idFormulario: formularioId,
            idAlumno: alumnoId,
            answers: formattedRespuestas
        }

        const result = await collection.updateOne({ idFormulario: formularioId, idAlumno: alumnoId }, { $set: doc });
        res.json(result);
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
    }
}


async function getAlumnoFormularios(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        const idAlumno = req.params.idAlumno;
        const query = { idAlumno: idAlumno };
        const result = await collection.find(query).toArray();
        res.json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
        
}

async function getAlumnoFormularioById(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        const idAlumno = req.params.idAlumno;
        const idFormulario = req.params.idFormulario;
        const query = { idAlumno: idAlumno, idFormulario: idFormulario };
        const result = await collection.find(query).toArray();
        res.json(result);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
        
}

export { insertAlumnoFormularios, updateAlumnoFormularios, getAlumnoFormularios, getAlumnoFormularioById };