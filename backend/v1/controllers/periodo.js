const {clientCon} = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function getAllPeriodo(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("periodos");

    const result = await collection.find().toArray();
    // console.log(JSON.stringify(result))
    res.send(JSON.stringify(result));
  } catch (err) {
    res.send(`ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test getAllPeriodo
// getAllPeriodo().catch(console.dir);

// Create
async function createPeriodo(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("periodos");

    /* // Crear un Doc de Ejemplo
        const doc = {
            nombre: "Mario 5",
            apellidos: "Guerra 5",
        } */

    // Crear un Doc
    const doc = [
      {
        clave: req.body.clave,
        status: req.body.status,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_inicio_insc: req.body.fecha_inicio_insc,
        fecha_fin_insc: req.body.fecha_fin_insc,
        cursos_max_por_alumno: req.body.cursos_max_por_alumno,
        idiomas_max_por_alumno: req.body.idiomas_max_por_alumno,
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
// Test createPeriodo
// createPeriodo().catch(console.dir);

// Update
async function updatePeriodo(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("periodos");

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
        clave: req.body.clave,
        status: req.body.status,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_inicio_insc: req.body.fecha_inicio_insc,
        fecha_fin_insc: req.body.fecha_fin_insc,
        cursos_max_por_alumno: req.body.cursos_max_por_alumno,
        idiomas_max_por_alumno: req.body.idiomas_max_por_alumno,
      },
    };

    const result = await collection.findOneAndUpdate(idDoc, doc);
    res.send(
      `Usuario con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
    );
  } catch (err) {
    res.send(`updatePeriodo ERROR: ${err}`);
  } finally {
    await client.close();
  }
}
// Test updatePeriodo
// updatePeriodo().catch(console.dir);

// Delete
async function deletePeriodo(req, res) {
  try {
    await client.connect();
    const database = client.db(mongodbInf.database);
    const collection = database.collection("periodos");

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
// Test deletePeriodo
// deletePeriodo().catch(console.dir);

module.exports = { getAllPeriodo, createPeriodo, updatePeriodo, deletePeriodo };
