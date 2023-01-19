const { clientCon } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

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
    const doc = [
      {
        idUsuario: req.body.idUsuario,
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
        ultima_escuela: req.body.ultima_escuela,
      },
    ];

    const result = await collection.insertMany(doc);
    for (i = 0; i < result.insertedCount; i++)
      res.send(
        `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
      );
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
        idUsuario: req.body.idUsuario,
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
        ultima_escuela: req.body.ultima_escuela,
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

    const result = await collection.deleteMany(idDoc);
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

// Metodo find
async function findAlumno(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("alumnos");
    let query = "";
    let key = "";
    let value = "";

    if (req.body.idUsuario) {
      key = "idUsuario";
      value = req.body.idUsuario;
      query = { idUsuario: value };
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
  } finally {
    await client.close();
  }
}

module.exports = {
  getAllAlumno,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  findAlumno,
};
