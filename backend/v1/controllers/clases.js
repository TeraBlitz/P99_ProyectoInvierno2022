import { clientConnect } from "../connection.js"
import { mongodbInf } from "../config.js"
import mongodb from "mongodb"

const COLLECTION_NAME = "clases"

async function getAllClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);
        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test getAllClase
// getAllClase().catch(console.dir);

// Create
async function createClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear un Doc
        const doc = [
            {
                clave: req.body.clave,
                area: req.body.area,
                modalidad: req.body.modalidad,
                nombre_curso: req.body.nombre_curso,
                nivel: req.body.nivel,
                cupo_maximo: req.body.cupo_maximo,
                cupo_actual: req.body.cupo_actual,
                edad_minima: req.body.edad_minima,
                edad_maxima: req.body.edad_maxima,
                lunes: req.body.lunes,
                martes: req.body.martes,
                miercoles: req.body.miercoles,
                jueves: req.body.jueves,
                viernes: req.body.viernes,
                sabado: req.body.sabado,
                clavePeriodo: req.body.clavePeriodo,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                nombreProfesor: req.body.nombreProfesor,
                apellidosProfesor: req.body.apellidosProfesor,
                matriculaProfesor: req.body.matriculaProfesor,
                idProfesor: new mongodb.ObjectId(req.body.idProfesor),
            },
        ];

        const result = await collection.insertMany(doc);
        for (let i = 0; i < result.insertedCount; i++)
            res.send(
                `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
            );
    } catch (err) {
        res.send(`ERROR: ${err}`);
    }
}
// Test createClase
// createClase().catch(console.dir);

// Update
async function updateClase(req, res) {

    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear el documento actualizado
        const idDoc = {
            _id: new mongodb.ObjectId(req.body._id),
        };
        const doc = {
            $set: {
                clave: req.body.clave,
                area: req.body.area,
                modalidad: req.body.modalidad,
                nombre_curso: req.body.nombre_curso,
                nivel: req.body.nivel,
                cupo_maximo: req.body.cupo_maximo,
                cupo_actual: req.body.cupo_actual,
                edad_minima: req.body.edad_minima,
                edad_maxima: req.body.edad_maxima,
                lunes: req.body.lunes,
                martes: req.body.martes,
                miercoles: req.body.miercoles,
                jueves: req.body.jueves,
                viernes: req.body.viernes,
                sabado: req.body.sabado,
                clavePeriodo: req.body.clavePeriodo,
                idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
                nombreProfesor: req.body.nombreProfesor,
                apellidosProfesor: req.body.apellidosProfesor,
                matriculaProfesor: req.body.matriculaProfesor,
                idProfesor: new mongodb.ObjectId(req.body.idProfesor),
            },
        };

        const result = await collection.findOneAndUpdate(idDoc, doc);
        res.send(
            `Documento con _id: ${result.value._id} actualizado con exito. Status: ${result.ok}.`
        );
    } catch (err) {
        res.send(`updateClase ERROR: ${err}`);
    }

}
// Test updateClase
// updateClase().catch(console.dir);

// Delete
async function deleteClase(req, res) {
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
// Test deleteClase
// deleteClase().catch(console.dir);


// Metodo find
async function findClase(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection(COLLECTION_NAME);

        let query = "";
        let key = "";
        let value = "";
        if (req.body.nombre_curso) {
            key = " nombre_curso";
            value = req.body.nombre_curso;
            query = { nombre_curso: value };
        } else if (req.body.nivel) {
            key = "nivel";
            value = req.body.nivel;
            id = req.body._id;
            query = { nivel: value };
        } else if (req.body.matriculaProfesor) {
            key = "matriculaProfesor";
            value = req.body.matriculaProfesor;
            id = req.body._id;
            query = { matriculaProfesor: value };
        } else if (req.body.frecuencia_semanal) {
            key = "frecuencia_semanal";
            value = req.body.frecuencia_semanal;
            id = req.body._id;
            query = { frecuencia_semanal: value };
        } else if (req.body.cupo_maximo) {
            key = "cupo_maximo";
            value = req.body.cupo_maximo;
            id = req.body._id;
            query = { cupo_maximo: value };
        } else if (req.body.cupo_actual) {
            key = "cupo_actual";
            value = req.body.cupo_actual;
            id = req.body._id;
            query = { cupo_actual: value };
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



async function getClasesDisp_ByPeriod(req, res) {

    //first filter the clases by period
    //the in the period extract the intial time and final time o the fecha_inicio_insc_talleres and fecha_fin_insc_talleres  - fecha_inicio_insc_idiomas -fecha_fin_insc_idiomas fecha_inicio_insc_asesorias - fecha_fin_insc_asesorias
    //yhen oly return te open clases

    let period = req.params.period
    const database = clientConnect.db(mongodbInf.database);
    console.log("period params",period);

    if (period == "null") {
        //get the most recent period
        console.log("retorna el mas reciente");   
        const dbPeriodrecent = database.collection("periodos");
        const resultPeriodrecent = await dbPeriodrecent.find().sort({ _id: -1 }).limit(1).toArray();
        period = resultPeriodrecent[0].clave;
        console.log("period",period);

        const collection = database.collection("clases");
        const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();
    
        res.send(clases_from_period);
        return;

    }

    const mostRecentPeriod = await database.collection("periodos").find().sort({ _id: -1 }).limit(1).toArray();
    const mostRecentPeriodClave = mostRecentPeriod[0].clave;


    if (period != mostRecentPeriodClave) {
        console.log("retorna la data de ese periodo");

        const collection = database.collection("clases");
        const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();

        res.send(clases_from_period);
        return;

    }



    const collection = database.collection("clases");
    const dbPeriod = database.collection("periodos");
    const resultPeriod = await dbPeriod.find({ clave: period }).toArray();

    const fecha_inicio_insc_talleres =  new Date(resultPeriod[0].fecha_inicio_insc_talleres).toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    const fecha_fin_insc_talleres = new Date(resultPeriod[0].fecha_fin_insc_talleres).toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    const fecha_inicio_insc_idiomas = new Date(resultPeriod[0].fecha_inicio_insc_idiomas).toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    const fecha_fin_insc_idiomas = new Date(resultPeriod[0].fecha_fin_insc_idiomas).toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    const fecha_inicio_insc_asesorias = new Date(resultPeriod[0].fecha_inicio_insc_asesorias).toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    const fecha_fin_insc_asesorias = new Date(resultPeriod[0].fecha_fin_insc_asesorias).toLocaleString("en-US", { timeZone: "America/Mexico_City" });

    const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();

    const clases_talleres = clases_from_period.filter(clase => clase.area === "talleres");
    const clases_idiomas = clases_from_period.filter(clase => clase.area === "idiomas");
    const clases_asesorias = clases_from_period.filter(clase => clase.area === "asesorias");


    //set date time mexico city in this format 2023-12-19T16:30:00 

    const currendDate = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
    console.log("today",currendDate);
    console.log("tallers",fecha_inicio_insc_talleres);

    let clases_open = [];

    if (currendDate >= fecha_inicio_insc_talleres && currendDate <= fecha_fin_insc_talleres) {
        console.log("talleres open");
        clases_open = clases_open.concat(clases_talleres);
    } if (currendDate >= fecha_inicio_insc_idiomas && currendDate <= fecha_fin_insc_idiomas) {
        clases_open = clases_open.concat(clases_idiomas);
        console.log("idiomas open");
    } if (currendDate >= fecha_inicio_insc_asesorias && currendDate <= fecha_fin_insc_asesorias) {
        clases_open = clases_open.concat(clases_asesorias);
        console.log("asesorias open");
    } 

    if (clases_open.length === 0) {
        res.send([]);
        return;
    }


    res.send(clases_open);

}

async function getClassesByPeriod(req, res) {
    let period = req.params.period;
    const database = clientConnect.db(mongodbInf.database);
  
    if (period === "null") {
      const mostRecentPeriod = await database.collection("periodos")
                                              .find().sort({ _id: -1 }).limit(1).toArray();
      period = mostRecentPeriod[0].clave;
    }
  
    const collection = database.collection("clases");
    const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();
    console.log('Periodo: ' + period + ' Numero de clases:' + clases_from_period.length);
  
    res.send(clases_from_period);
  }

export {
    getAllClase,
    createClase,
    updateClase,
    deleteClase,
    findClase,
    getClasesDisp_ByPeriod,
    getClassesByPeriod
};
