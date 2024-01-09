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
    function parseDateString(dateString) {
        var dateComponents = dateString.split(/[\s,/:]+/);

        var year = parseInt(dateComponents[2]);
        var month = parseInt(dateComponents[0]) - 1;
        var day = parseInt(dateComponents[1]);
        var hours = parseInt(dateComponents[3]);
        var minutes = parseInt(dateComponents[4]);
        var seconds = parseInt(dateComponents[5]);

        return new Date(year, month, day, hours, minutes, seconds);
    }


    let period = req.params.period || null;
    let alumno = req.params.alumno || null;

    const database = clientConnect.db(mongodbInf.database);
    console.log("period params", period);

    //if period is null  or undefined return the most recent period
    if (period == 'inicial' || alumno == 'inicial') {
        console.log("period is null or undefined");
        try {
            // Get the most recent period
            console.log("Retrieving the most recent period...");
            const dbPeriodrecent = database.collection("periodos");
            const resultPeriodrecent = await dbPeriodrecent.find().sort({ _id: -1 }).limit(1).toArray();

            // Update period with the most recent one
            period = resultPeriodrecent[0].clave;
            console.log("period", period);

            // Fetch classes for the most recent period
            const collection = database.collection("clases");
            const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();

            res.send(clases_from_period);
        } catch (error) {
            console.error("Error retrieving classes:", error);
            res.status(500).send("Internal Server Error");
        }
    } else {

        const collection = database.collection("clases");
        const dbPeriod = database.collection("periodos");
        const resultPeriod = await dbPeriod.find({ clave: period }).toArray();
        const options = { timeZone: 'America/Monterrey', hour12: false };


        const fecha_inicio_insc_talleres = new Date(resultPeriod[0].fecha_inicio_insc_talleres).toLocaleString('en-US', options)
        const fecha_fin_insc_talleres = new Date(resultPeriod[0].fecha_fin_insc_talleres).toLocaleString('en-US', options)
        const fecha_inicio_insc_idiomas = new Date(resultPeriod[0].fecha_inicio_insc_idiomas).toUTCString().toLocaleString('en-US', options)
        const fecha_fin_insc_idiomas = new Date(resultPeriod[0].fecha_fin_insc_idiomas).toUTCString().toLocaleString('en-US', options)
        const fecha_inicio_insc_asesorias = new Date(resultPeriod[0].fecha_inicio_insc_asesorias).toUTCString().toLocaleString('en-US', options)
        const fecha_fin_insc_asesorias = new Date(resultPeriod[0].fecha_fin_insc_asesorias).toUTCString().toLocaleString('en-US', options)

        const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();

        const clases_talleres = clases_from_period.filter(clase => clase.area === "talleres" || clase.area === "Talleres");
        const clases_idiomas = clases_from_period.filter(clase => clase.area === "idiomas" || clase.area === "Idiomas");
        const clases_asesorias = clases_from_period.filter(clase => clase.area === "asesorias" || clase.area === "Asesorias");


        //set date time mexico city in this format 2023-12-19T16:30:00 
        const utcTime = new Date();
        const currentDate = new Date(utcTime.getTime() - (utcTime.getTimezoneOffset() * 60000));


        console.log("currentDate", currentDate)
        console.log("fecha_inicio_insc_talleres", parseDateString(fecha_inicio_insc_talleres))
        console.log("fecha_fin_insc_talleres", parseDateString(fecha_fin_insc_talleres))


        let clases_open = [];

        if (currentDate >= parseDateString(fecha_inicio_insc_talleres) && currentDate <= parseDateString(fecha_fin_insc_talleres)) {
            console.log("talleres open");

            clases_open = clases_open.concat(clases_talleres);

        } if (currentDate >= fecha_inicio_insc_idiomas && currentDate <= fecha_fin_insc_idiomas) {
            clases_open = clases_open.concat(clases_idiomas);
            console.log("idiomas open");
        } if (currentDate >= fecha_inicio_insc_asesorias && currentDate <= fecha_fin_insc_asesorias) {
            clases_open = clases_open.concat(clases_asesorias);
            console.log("asesorias open");
        }
        if (clases_open.length === 0) {
            console.log("no classes open");
            res.send([]);
            return;
        }

        res.send(clases_open);



    }

    // const mostRecentPeriod = await database.collection("periodos").find().sort({ _id: -1 }).limit(1).toArray();

    // const mostRecentPeriodClave = mostRecentPeriod[0].clavePeriodo;

    // console.log("mostRecentPeriodClave",mostRecentPeriodClave);

    // if (period != mostRecentPeriodClave) {
    //     console.log("retorna la data de ese periodo");

    //     const collection = database.collection("clases");
    //     const clases_from_period = await collection.find({ clavePeriodo: period }).toArray();

    //     res.send(clases_from_period);
    //     return;

    // }




}


async function isClaseAvailable(req, res) {

    let clase = req.params.clase || null;
    let periodo = req.params.periodo || null;

    console.log("clase", clase);
    console.log("periodo", periodo);

    const database = clientConnect.db(mongodbInf.database);
    const dbPeriod = database.collection("periodos");
    const resultPeriod = await dbPeriod.find({ clave: periodo }).toArray();
    const options = { timeZone: 'America/Monterrey', hour12: false };


    const fecha_inicio_insc_talleres = new Date(resultPeriod[0].fecha_inicio_insc_talleres).toLocaleString('en-US', options)
    const fecha_fin_insc_talleres = new Date(resultPeriod[0].fecha_fin_insc_talleres).toLocaleString('en-US', options)
    const fecha_inicio_insc_idiomas = new Date(resultPeriod[0].fecha_inicio_insc_idiomas).toUTCString().toLocaleString('en-US', options)
    const fecha_fin_insc_idiomas = new Date(resultPeriod[0].fecha_fin_insc_idiomas).toUTCString().toLocaleString('en-US', options)
    const fecha_inicio_insc_asesorias = new Date(resultPeriod[0].fecha_inicio_insc_asesorias).toUTCString().toLocaleString('en-US', options)
    const fecha_fin_insc_asesorias = new Date(resultPeriod[0].fecha_fin_insc_asesorias).toUTCString().toLocaleString('en-US', options)

    const utcTime = new Date();
    const currentDate = new Date(utcTime.getTime() - (utcTime.getTimezoneOffset() * 60000));


    let tipo_clase = clase.area;

    if (tipo_clase === "talleres" || tipo_clase === "Talleres") {
        if (currentDate >= parseDateString(fecha_inicio_insc_talleres) && currentDate <= parseDateString(fecha_fin_insc_talleres)) {
            res.send(true);
        } else {
            res.send(false);
        }
    } else if (tipo_clase === "idiomas" || tipo_clase === "Idiomas") {
        if (currentDate >= fecha_inicio_insc_idiomas && currentDate <= fecha_fin_insc_idiomas) {
            res.send(true);
        } else {
            res.send(false);
        }
    } else if (tipo_clase === "asesorias" || tipo_clase === "Asesorias") {
        if (currentDate >= fecha_inicio_insc_asesorias && currentDate <= fecha_fin_insc_asesorias) {
            res.send(true);
        } else {
            res.send(false);
        }
    } else {
        res.send(false);
    }

}

export {
    getAllClase,
    createClase,
    updateClase,
    deleteClase,
    findClase,
    getClasesDisp_ByPeriod,
    isClaseAvailable
};
