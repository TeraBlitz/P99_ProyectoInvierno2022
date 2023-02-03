const { clientConnect } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");
const COLLECTION_NAME = "alumnoClases"

async function getAllAlumnoClases(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();

        res.send(result);
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
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear un Doc
        const doc = [
            {
                idAlumno: new mongodb.ObjectId(req.body.idAlumno),
                idClase: new mongodb.ObjectId(req.body.idClase),
                areaClase: req.body.areaClase,
                claveClase: req.body.claveClase,
                nombre_cursoClase: req.body.nombre_cursoClase,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                clavePeriodo: req.body.clavePeriodo,
                statusPeriodo: req.body.statusPeriodo,
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
    }
}
// Test createAlumnoClases
// createAlumnoClases().catch(console.dir);

// Update
async function updateAlumnoClases(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
            $set: {
                idAlumno: new mongodb.ObjectId(req.body.idAlumno),
                idClase: new mongodb.ObjectId(req.body.idClase),
                areaClase: req.body.areaClase,
                claveClase: req.body.claveClase,
                nombre_cursoClase: req.body.nombre_cursoClase,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                clavePeriodo: req.body.clavePeriodo,
                statusPeriodo: req.body.statusPeriodo,
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
    }
}
// Test updateAlumnoClases
// updateAlumnoClases().catch(console.dir);

// Delete
async function deleteAlumnoClases(req, res) {
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
    }
}
// Test deleteAlumnoClases
// deleteAlumnoClases().catch(console.dir);


// Find
async function findAlumnoClases(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Variables.
        let query = "";
        let key = "";
        let value = "";

        if (req.body.idPeriodo) {
            key = "idPeriodo";
            value = req.body.idPeriodo;
            query = { idPeriodo: new mongodb.ObjectId(value) };
        } else if (req.body.idAlumno) {
            key = "idAlumno";
            value = req.body.idAlumno;
            query = { idAlumno: new mongodb.ObjectId(value) };
        } else if (req.body.idClase) {
            key = "idClase";
            value = req.body.idClase;
            query = { idClase: new mongodb.ObjectId(value) };
        } else {
            return res.status(400).json({
                msg: `ERROR: No se mandaron parametros validos. Consulte con un Administrador.`
            });
        }

        const result = await collection.find(query).toArray();
        if (result == "") {
            res.send(`Ninguna documento encontrado con ${key} : ${value}`);
        } else {
            res.send(result);
        }
    } catch (err) {
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    }
}


module.exports = {
    getAllAlumnoClases,
    createAlumnoClases,
    updateAlumnoClases,
    deleteAlumnoClases,
    findAlumnoClases,
};
