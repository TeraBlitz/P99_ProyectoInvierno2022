const { clientConnect } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");
const COLLECTION_NAME = "alumnos"

async function getAllAlumno(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllAlumno
// getAllAlumno().catch(console.dir);

// Create
async function createAlumno(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear un Doc
        const doc = [
            {
                curp: req.body.curp,
                clave_unica_identificacion: req.body.clave_unica_identificacion,
                nombre: req.body.nombre,
                apellido_paterno: req.body.apellido_paterno,
                apellido_materno: req.body.apellido_materno,
                fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                tutor_nombre: req.body.tutor_nombre,
                tutor_apellido_paterno: req.body.tutor_apellido_paterno,
                tutor_apellido_materno: req.body.tutor_apellido_materno,
                tutor_correo: req.body.tutor_correo,
                tutor_num_telefono: req.body.tutor_num_telefono,
                num_telefono: req.body.num_telefono,
                pais: req.body.pais,
                estado: req.body.estado,
                ciudad: req.body.ciudad,
                colonia: req.body.colonia,
                codigo_postal: req.body.codigo_postal,
                escolaridad: req.body.escolaridad,
                ultima_escuela: req.body.ultima_escuela,
                idUser: req.body.idUser
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
// Test createAlumno
// createAlumno().catch(console.dir);

// Update
async function updateAlumno(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        // Crear el documento actualizado
        const idDoc = {
        _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
        $set: {
            curp: req.body.curp,
            clave_unica_identificacion: req.body.clave_unica_identificacion,
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            tutor_nombre: req.body.tutor_nombre,
            tutor_apellido_paterno: req.body.tutor_apellido_paterno,
            tutor_apellido_materno: req.body.tutor_apellido_materno,
            tutor_correo: req.body.tutor_correo,
            tutor_num_telefono: req.body.tutor_num_telefono,
            num_telefono: req.body.num_telefono,
            pais: req.body.pais,
            estado: req.body.estado,
            ciudad: req.body.ciudad,
            colonia: req.body.colonia,
            codigo_postal: req.body.codigo_postal,
            escolaridad: req.body.escolaridad,
            ultima_escuela: req.body.ultima_escuela,
            idUser: req.body.idUser
        },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
        `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateAlumno ERROR: ${err}`);
    }
}
// Test updateAlumno
// updateAlumno().catch(console.dir);

// Delete
async function deleteAlumno(req, res) {
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
// Test deleteAlumno
// deleteAlumno().catch(console.dir);

// Metodo find
async function findAlumno(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        let query = "";
        let key = "";
        let value = "";

        if (req.body.idUser) {
        key = "idUser";
        value = req.body.idUser;
        query = { idUser: value };
        } else if (req.body.curp) {
        key = "curp";
        value = req.body.curp;
        query = { curp: value };
        } else if (req.body.nombre) {
        key = "nombre";
        value = req.body.nombre;
        query = { nombre: value };
        } else if (req.body.apellido_paterno) {
        key = "apellido_paterno";
        value = req.body.apellido_paterno;
        query = { apellido_paterno: value };
        } else if (req.body.apellido_materno) {
        key = "apellido_materno";
        value = req.body.apellido_materno;
        query = { apellido_materno: value };
        } else if (req.body.fecha_de_nacimiento) {
        key = "fecha_de_nacimiento";
        value = req.body.fecha_de_nacimiento;
        query = { fecha_de_nacimiento: value };
        } else if (req.body.tutor_nombre) {
        key = "tutor_nombre";
        value = req.body.tutor_nombre;
        query = { tutor_nombre: value };
        } else if (req.body.tutor_apellido_paterno) {
        key = "tutor_apellido_paterno";
        value = req.body.tutor_apellido_paterno;
        query = { tutor_apellido_paterno: value };
        } else if (req.body.tutor_apellido_materno) {
        key = "tutor_apellido_materno";
        value = req.body.tutor_apellido_materno;
        query = { tutor_apellido_materno: value };
        } else if (req.body.tutor_correo) {
        key = "tutor_correo";
        value = req.body.tutor_correo;
        query = { tutor_correo: value };
        } else if (req.body.tutor_num_telefono) {
        key = "tutor_num_telefono";
        value = req.body.tutor_num_telefono;
        query = { tutor_num_telefono: value };
        } else if (req.body.num_telefono) {
        key = "num_telefono";
        value = req.body.num_telefono;
        query = { num_telefono: value };
        } else if (req.body.estado) {
        key = "estado";
        value = req.body.estado;
        query = { estado: value };
        } else if (req.body.ciudad) {
        key = "ciudad";
        value = req.body.ciudad;
        query = { ciudad: value };
        } else if (req.body.colonia) {
        key = "colonia";
        value = req.body.colonia;
        query = { colonia: value };
        } else if (req.body.codigo_postal) {
        key = "codigo_postal";
        value = req.body.codigo_postal;
        query = { codigo_postal: value };
        } else if (req.body.escolaridad) {
        key = "escolaridad";
        value = req.body.escolaridad;
        query = { escolaridad: value };
        } else if (req.body.ultima_escuela) {
        key = "ultima_escuela";
        value = req.body.ultima_escuela;
        query = { ultima_escuela: value };
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
    getAllAlumno,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    findAlumno,
};
