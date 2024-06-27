import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"


const COLLECTION_NAME = "alumnoClases"

async function getAllAlumnoClases(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();

        res.send(result);
    } catch (err) {
        console.log(err)
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
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                areaClase: req.body.areaClase
            },
        ];

        const collectionClase = database.collection("clases");
        const idDoc = {
            _id: new mongodb.ObjectId(req.body.idClase),
        };
        const docClase = res.locals.claseCollection[0];
        const cupo_actual = Number(docClase.cupo_actual) ?? 0;
        const docClaseUpdate = {
            $set: {
                cupo_actual: cupo_actual + 1,
            },
        };
        await collectionClase.findOneAndUpdate(idDoc, docClaseUpdate);

        const result = await collection.insertMany(doc);
        for (let i = 0; i < result.insertedCount; i++)
        res.json({
            msg: `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        });
    } catch (err) {
        console.log(err)
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
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
            },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.json({
            msg: `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        });
    } catch (err) {
        console.log(err)
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
        // Get idClase
        const doc = await collection.findOne(idDoc);
        const idClase = doc.idClase;

        const result = await collection.deleteMany(idDoc);
        // console.log(JSON.stringify(result))

        if (result.deletedCount === 1) {

            const collectionClase = database.collection("clases");
            const idDocClase = {
                _id: new mongodb.ObjectId(idClase),
            };
            const docClase = await collectionClase.findOne(idDocClase);
            const cupo_actual = Number(docClase.cupo_actual) ?? 0;
            const docClaseUpdate = {
                $set: {
                    cupo_actual: cupo_actual - 1,
                },
            };
            await collectionClase.findOneAndUpdate(idDocClase, docClaseUpdate);

            res.json({
                msg: `Documento con _id: ${idDoc._id} eliminado con exito.`
            });
        } else {
            res.json({
                msg: "Ningun documento encontrado. 0 Documentos eliminados."
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    }
}
async function getByAlumno(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        const validator = await collection.find({idAlumno: new mongodb.ObjectId(req.params.idAlumno)}).toArray();
        res.send(validator)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: `ERROR: ${err}`
        });
    }


}

export {
    getAllAlumnoClases,
    createAlumnoClases,
    updateAlumnoClases,
    deleteAlumnoClases,
    getByAlumno,
};
