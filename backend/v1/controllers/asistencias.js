const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Connection URI.
// mongodb://localhost:27017
const uri = `mongodb://${mongodbInf.host}:${mongodbInf.port}/${mongodbInf.database}`;
// Crear un nuevo MongoClient
const client = new mongodb.MongoClient(uri);

async function getAllAsistencia(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("asistencias");

    const result = await collection.find().toArray();
    // console.log(JSON.stringify(result))
    res.send(JSON.stringify(result));
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test getAllAsistencia
// getAllAsistencia().catch(console.dir);

// Create
async function createAsistencia(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("asistencias");

    /* // Crear un Doc de Ejemplo
        const doc = {
            nombre: "Mario 5",
            apellidos: "Guerra 5",
        } */

    // Crear un Doc
    const doc = [
      {
        idUsuario: req.body.idUsuario,
        idClase: req.body.idClase,
        fecha: req.body.fecha,
        asistio: req.body.asistio,
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
// Test createAsistencia
// createAsistencia().catch(console.dir);

// Update
async function updateAsistencia(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("asistencias");

    /* // Crear documento actualizado test
        const idDocTest = {
            _id: new mongodb.ObjectId("63bf608c8391d717b9d65739"),
        }
        const docTest = {
            $set: { 
                nombre: "Jorge",
                apellidos: "Tato"
            }
        } */

    // Crear el documento actualizado
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };
    const doc = {
      $set: {
        idUsuario: req.body.idUsuario,
        idClase: req.body.idClase,
        fecha: req.body.fecha,
        asistio: req.body.asistio,
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updateAsistencia ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updateAsistencia
// updateAsistencia().catch(console.dir);

// Delete
async function deleteAsistencia(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("asistencias");

    // ID documento a eliminar
    const idDoc = {
      _id: new mongodb.ObjectId(req.body._id),
    };

    /* // CID documento a eliminar test
        const idDocTest = {
            _id: new mongodb.ObjectId("63bf6107b5823dbe5830157d"),
        } */

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
// Test deleteAsistencia
// deleteAsistencia().catch(console.dir);

module.exports = {
  getAllAsistencia,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
};
