import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"

const COLLECTION_NAME = "formularios";

async function getFormularioById(req, res) {
  try {
    const database = clientConnect.db(mongodbInf.database);
    const collection = database.collection(COLLECTION_NAME);
    
    const result = await collection.findOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function getAllFormularios(req, res) {
  try {
    const database = clientConnect.db(mongodbInf.database);
    const collection = database.collection(COLLECTION_NAME);
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

export { getFormularioById, getAllFormularios };