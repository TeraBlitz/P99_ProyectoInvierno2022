/* const Alumno = require('../models/alumnos') */
const { connection } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

/* // Creamos el cliente
const con = connection() */

// Connection URI.
// mongodb://localhost:27017
const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`;
// Crear un nuevo MongoClient
const client = new mongodb.MongoClient(uri);

async function getAllAlumno(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("alumnos");

    const result = await collection.find().toArray();
    res.send(result);
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test getAllAlumno
// getAllAlumno().catch(console.dir);

// Create
async function createAlumno(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("alumnos");

    // Crear un Doc
    const doc = {
      idUsuario : req.body.idUsuario ,
        curp: req.body.curp,
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
        estado: req.body.estado,
        ciudad: req.body.ciudad,
        colonia: req.body.colonia,
        codigo_postal: req.body.codigo_postal,
        escolaridad: req.body.escolaridad,
        ultima_escuela: req.body.ultima_escuela
    };

    const result = await collection.insertOne(doc);
    res.send(`Un documeno fue insertado con el ID: ${result.insertedId}`);
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test createAlumno
// createAlumno().catch(console.dir);

// Update
async function updateAlumno(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("alumnos");

    // Crear el documento actualizado
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };
    const doc = {
      $set: {
      idUsuario : req.body.idUsuario ,
      curp: req.body.curp,
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
      estado: req.body.estado,
      ciudad: req.body.ciudad,
      colonia: req.body.colonia,
      codigo_postal: req.body.codigo_postal,
      escolaridad: req.body.escolaridad,
      ultima_escuela: req.body.ultima_escuela
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updateAlumno ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updateAlumno
// updateAlumno().catch(console.dir);

// Delete
async function deleteAlumno(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("alumnos");

    // ID documento a eliminar
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };

    const result = await collection.deleteOne(idDoc);
    // console.log(JSON.stringify(result))

    if (result.deletedCount === 1) {
      res.send(`Documento con _id: ${idDoc._id} eliminado con exito.`);
    } else {
      res.send("Ningun documento encontrado. 0 Documentos eliminados.");
    }
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test deleteAlumno
// deleteAlumno().catch(console.dir);

module.exports = { getAllAlumno, createAlumno, updateAlumno, deleteAlumno };
