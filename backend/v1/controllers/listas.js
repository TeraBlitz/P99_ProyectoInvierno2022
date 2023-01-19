const {clientCon} = require('../connection.js')
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function getAllLista(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("listas");

    const result = await collection.find().toArray();
    res.send(result);
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test getAllLista
// getAllLista().catch(console.dir);

// Create
async function createLista(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("listas");

    // Crear un Doc
    const doc = [
      {
        idAlumno : req.body.idAlumno ,
        idClase : req.body.idClase ,
        lugar_de_espera: req.body.lugar_de_espera,
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
  } finally {
    await client.close();
  }
}
// Test createLista
// createLista().catch(console.dir);

// Update
async function updateLista(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("listas");

    // Crear el documento actualizado
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };
    const doc = {
      $set: {
        idAlumno : req.body.idAlumno ,
        idClase : req.body.idClase ,
        lugar_de_espera: req.body.lugar_de_espera,
        status: req.body.status,
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updateLista ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updateLista
// updateLista().catch(console.dir);

// Delete
async function deleteLista(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("listas");

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
// Test deleteLista
// deleteLista().catch(console.dir);

module.exports = { getAllLista, createLista, updateLista, deleteLista };
