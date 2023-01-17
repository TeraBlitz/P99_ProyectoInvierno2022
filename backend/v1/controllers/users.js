const {clientCon} = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function getAllUser(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("users");

    const result = await collection.find().toArray();
    res.send(result);
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test getAllUser
// getAllUser().catch(console.dir);

// Create
async function createUser(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("users");

    // Crear un Doc
    const doc = [
      {
        user_name: req.body.user_name,
        rol: req.body.rol,
        correo: req.body.correo,
        password: req.body.password,
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
// Test createUser
// createUser().catch(console.dir);

// Update
async function updateUser(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("users");

    // Crear el documento actualizado
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };
    const doc = {
      $set: {
        user_name: req.body.user_name,
        rol: req.body.rol,
        correo: req.body.correo,
        password: req.body.password,
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updateUser ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updateUser
// updateUser().catch(console.dir);

// Delete
async function deleteUser(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("users");

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
// Test deleteUser
// deleteUser().catch(console.dir);

module.exports = { getAllUser, createUser, updateUser, deleteUser };
