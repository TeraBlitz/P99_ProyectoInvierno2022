const { clientConnect } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");
const COLLECTION_NAME = "periodos"

async function getAllPeriodo(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();
        // console.log(JSON.stringify(result))
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    } 
}
// Test getAllPeriodo
// getAllPeriodo().catch(console.dir);

// Create
async function createPeriodo(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear un Doc
        const doc = [
        {
            clave: req.body.clave,
            status: req.body.status,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            fecha_inicio_insc_talleres: req.body.fecha_inicio_insc_talleres,
            fecha_fin_insc_talleres: req.body.fecha_fin_insc_talleres,
            fecha_inicio_insc_idiomas: req.body.fecha_inicio_insc_idiomas,
            fecha_fin_insc_idiomas: req.body.fecha_fin_insc_idiomas,
            fecha_inicio_insc_asesorias: req.body.fecha_inicio_insc_asesorias,
            fecha_fin_insc_asesorias: req.body.fecha_fin_insc_asesorias,
            cursos_max_por_alumno: req.body.cursos_max_por_alumno,
            idiomas_max_por_alumno: req.body.idiomas_max_por_alumno,
            cursos_inscritos:  req.body.cursos_inscritos,
            alumnos_inscritos:  req.body.alumnos_inscritos,
            profesores_inscritos:  req.body.profesores_inscritos
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
// Test createPeriodo
// createPeriodo().catch(console.dir);

// Update
async function updatePeriodo(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
        $set: {
            clave: req.body.clave,
            status: req.body.status,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            fecha_inicio_insc_talleres: req.body.fecha_inicio_insc_talleres,
            fecha_fin_insc_talleres: req.body.fecha_fin_insc_talleres,
            fecha_inicio_insc_idiomas: req.body.fecha_inicio_insc_idiomas,
            fecha_fin_insc_idiomas: req.body.fecha_fin_insc_idiomas,
            fecha_inicio_insc_asesorias: req.body.fecha_inicio_insc_asesorias,
            fecha_fin_insc_asesorias: req.body.fecha_fin_insc_asesorias,
            cursos_max_por_alumno: req.body.cursos_max_por_alumno,
            idiomas_max_por_alumno: req.body.idiomas_max_por_alumno,
            cursos_inscritos:  req.body.cursos_inscritos,
            alumnos_inscritos:  req.body.alumnos_inscritos,
            profesores_inscritos:  req.body.profesores_inscritos
        },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
            `Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updatePeriodo ERROR: ${err}`);
    }
}
// Test updatePeriodo
// updatePeriodo().catch(console.dir);

// Delete
async function deletePeriodo(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // ID documento a eliminar
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };

        /* // CID documento a eliminar test
            const idDocTest = {
                _id: new mongodb.ObjectId("63bf6107b5823dbe5830157d"),
            } */

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
// Test deletePeriodo
// deletePeriodo().catch(console.dir);

//find
async function findPeriodo(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        let query = "";
        let key = "";
        let value = "";
        if (req.body.clave) {
        key = "clave";
        value = req.body.clave;
        query = { clave: value };
        } else if (req.body.status) {
        key = "status";
        value = req.body.status;
        query = { status: value };
        } else if (req.body.fecha_inicio) {
        key = "fecha_inicio";
        value = req.body.fecha_inicio;
        query = { fecha_inicio: value };
        } else if (req.body.fecha_fin) {
        key = "fecha_fin";
        value = req.body.fecha_fin;
        query = { fecha_fin: value };
        } else if (req.body.fecha_inicio_insc) {
        key = "fecha_inicio_insc";
        value = req.body.fecha_inicio_insc;
        query = { fecha_inicio_insc: value };
        } else if (req.body.fecha_fin_insc) {
        key = "fecha_fin_insc";
        value = req.body.fecha_fin_insc;
        query = { fecha_fin_insc: value };
        } else if (req.body.cursos_max_por_alumno) {
        key = "cursos_max_por_alumno";
        value = req.body.cursos_max_por_alumno;
        query = { cursos_max_por_alumno: value };
        } else if (req.body.idiomas_max_por_alumno) {
        key = "idiomas_max_por_alumno";
        value = req.body.idiomas_max_por_alumno;
        query = { idiomas_max_por_alumno: value };
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

module.exports = {
    getAllPeriodo,
    createPeriodo,
    updatePeriodo,
    deletePeriodo,
    findPeriodo,
};
