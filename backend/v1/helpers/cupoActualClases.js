import { clientConnect } from "../connection.js";
import { mongodbInf } from "../config.js";
import mongodb from "mongodb";

/**
 * Función que calcula el cupo actual de una lista de clases
 * @param {Array} clases Lista de clases
 * @returns {Promise<Array>} Lista de clases con cupo actual correcto
 */
async function getCupoActualClases(clases) {
  const database = clientConnect.db(mongodbInf.database);
  const collectionAC = database.collection("alumnoClases");

  for (const clase of clases) {
    const query = { idClase: new mongodb.ObjectId(clase.idClase) };
    try {
      const validator = await collectionAC.find(query).toArray();
      clase.cupo_actual = validator.length;
    } catch (err) {
      console.log(err);
    }
  }
  return clases;
}

export { getCupoActualClases };
