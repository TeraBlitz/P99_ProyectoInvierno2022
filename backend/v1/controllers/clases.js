import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"

const COLLECTION_NAME = "clases"

async function getAllClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllClase
// getAllClase().catch(console.dir);

// Create
async function createClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear un Doc
        const doc = [
            {
                clave: req.body.clave,
                area: req.body.area,
                modalidad: req.body.modalidad,
                nombre_curso: req.body.nombre_curso,
                nivel: req.body.nivel,
                cupo_maximo: req.body.cupo_maximo,
                cupo_actual: req.body.cupo_actual,
                edad_minima: req.body.edad_minima,
                edad_maxima: req.body.edad_maxima,
                lunes: req.body.lunes,
                martes: req.body.martes,
                miercoles: req.body.miercoles,
                jueves: req.body.jueves,
                viernes: req.body.viernes,
                sabado: req.body.sabado,
                clavePeriodo: req.body.clavePeriodo,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                nombreProfesor: req.body.nombreProfesor,
                apellidosProfesor: req.body.apellidosProfesor,
                matriculaProfesor: req.body.matriculaProfesor,
                idProfesor: new mongodb.ObjectId(req.body.idProfesor),
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
// Test createClase
// createClase().catch(console.dir);

// Update
async function updateClase(req, res) {

    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
            $set: {
                clave: req.body.clave,
                area: req.body.area,
                modalidad: req.body.modalidad,
                nombre_curso: req.body.nombre_curso,
                nivel: req.body.nivel,
                cupo_maximo: req.body.cupo_maximo,
                cupo_actual: req.body.cupo_actual,
                edad_minima: req.body.edad_minima,
                edad_maxima: req.body.edad_maxima,
                lunes: req.body.lunes,
                martes: req.body.martes,
                miercoles: req.body.miercoles,
                jueves: req.body.jueves,
                viernes: req.body.viernes,
                sabado: req.body.sabado,
                clavePeriodo: req.body.clavePeriodo,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                nombreProfesor: req.body.nombreProfesor,
                apellidosProfesor: req.body.apellidosProfesor,
                matriculaProfesor: req.body.matriculaProfesor,
                idProfesor: new mongodb.ObjectId(req.body.idProfesor),
            },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
            `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateClase ERROR: ${err}`);
    } 

}
// Test updateClase
// updateClase().catch(console.dir);

// Delete
async function deleteClase(req, res) {
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
// Test deleteClase
// deleteClase().catch(console.dir);


// Metodo find
async function findClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        let query = "";
        let key = "";
        let value = "";
        if (req.body.nombre_curso) {
        key = " nombre_curso";
        value = req.body.nombre_curso;
        query = { nombre_curso: value };
        } else if (req.body.nivel) {
        key = "nivel";
        value = req.body.nivel;
        id = req.body._id;
        query = { nivel: value };
        } else if (req.body.matriculaProfesor) {
        key = "matriculaProfesor";
        value = req.body.matriculaProfesor;
        id = req.body._id;
        query = { matriculaProfesor: value };
        } else if (req.body.frecuencia_semanal) {
        key = "frecuencia_semanal";
        value = req.body.frecuencia_semanal;
        id = req.body._id;
        query = { frecuencia_semanal: value };
        } else if (req.body.cupo_maximo) {
        key = "cupo_maximo";
        value = req.body.cupo_maximo;
        id = req.body._id;
        query = { cupo_maximo: value };
        } else if (req.body.cupo_actual) {
        key = "cupo_actual";
        value = req.body.cupo_actual;
        id = req.body._id;
        query = { cupo_actual: value };
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
    getAllClase,
    createClase,
    updateClase,
    deleteClase,
    findClase,
};
