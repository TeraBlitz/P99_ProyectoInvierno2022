const { clientCon } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function getAllProfesor(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("profesores");

    const result = await collection.find().toArray();
    // console.log(JSON.stringify(result))
    res.send(JSON.stringify(result));
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } 
}
// Test getAllProfesor
// getAllProfesor().catch(console.dir);

// Create
async function createProfesor(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("profesores");

    // Crear un Doc
    const doc = [
      {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        matricula: req.body.matricula,
        correo: req.body.correo,
        fecha_de_nacimiento: req.body.fecha_de_nacimiento,
        num_telefono: req.body.num_telefono,
        num_cursos_impartidos: req.body.num_cursos_impartidos,
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
  } finally {
    await client.close();
  }
}
// Test createProfesor
// createProfesor().catch(console.dir);

// Update
async function updateProfesor(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("profesores");

    // Crear el documento actualizado
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };
    const doc = {
      $set: {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        matricula: req.body.matricula,
        correo: req.body.correo,
        fecha_de_nacimiento: req.body.fecha_de_nacimiento,
        num_telefono: req.body.num_telefono,
        num_cursos_impartidos: req.body.num_cursos_impartidos,
        idUser: req.body.idUser
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updateProfesor ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updateProfesor
// updateProfesor().catch(console.dir);

// Delete
async function deleteProfesor(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("profesores");

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
// Test deleteProfesor
// deleteProfesor().catch(console.dir);


module.exports = {
  getAllProfesor,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
