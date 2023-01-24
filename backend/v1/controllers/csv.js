const { clientCon } = require("../connection.js");
const { mongodbInf } = require("../config.js");
const mongodb = require("mongodb");

// Crear un nuevo MongoClient
const client = clientCon;

async function subirClases(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Crear el arreglo de Docs
        req.body.clasesJson = JSON.parse(req.body.clasesJson)

        let docs = []
        for (let i = 0; i < req.body.clasesJson.length; i++) {
            docs[i] = {}
            docs[i].clave = req.body.clasesJson[i].clave
            docs[i].area = req.body.clasesJson[i].area
            docs[i].modalidad = req.body.clasesJson[i].modalidad
            docs[i].nombre_curso = req.body.clasesJson[i].nombre_curso
            docs[i].nivel = req.body.clasesJson[i].nivel
            docs[i].matriculaMaestro = req.body.clasesJson[i].matriculaMaestro
            docs[i].clavePeriodo = req.body.clasesJson[i].clavePeriodo
            docs[i].edad_minima = req.body.clasesJson[i].edad_minima
            docs[i].edad_maxima = req.body.clasesJson[i].edad_maxima
            docs[i].lunes = req.body.clasesJson[i].lunes
            docs[i].martes = req.body.clasesJson[i].martes
            docs[i].miercoles = req.body.clasesJson[i].miercoles
            docs[i].jueves = req.body.clasesJson[i].jueves
            docs[i].viernes = req.body.clasesJson[i].viernes
            docs[i].sabado = req.body.clasesJson[i].sabado
            docs[i].cupo_maximo = req.body.clasesJson[i].cupo_maximo
            docs[i].cupo_actual = req.body.clasesJson[i].cupo_actual
        }
    
        const result = await collection.insertMany(docs);

        // Estructuracion del mensaje de respuesta.
        let msg = []
        for (i = 0; i < result.insertedCount; i++){
            msg[i] = {}
            msg[i].msg = `Un documento fue insertado con el ID: ${result.insertedIds[i]}`
        }

        res.json({
            "msg": msg
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "msg": `Ha ocurrido un error.`,
            "error": `${err}`,
        });
    } finally {
        await client.close();
    }
}

async function subirProfesores(req, res) {
    try {
        await client.connect();
        const database = client.db(mongodbInf.database);
        const collection = database.collection("profesores");
  
        // Crear el arreglo de Docs
        req.body.profesoresJson = JSON.parse(req.body.profesoresJson)
        // console.log(req.body.profesoresJson)
  
        let docs = []
        for (let i = 0; i < req.body.profesoresJson.length; i++) {
            docs[i] = {}
            docs[i].nombre = req.body.profesoresJson[i].nombre
            docs[i].apellidos = req.body.profesoresJson[i].apellidos
            docs[i].matricula = req.body.profesoresJson[i].matricula
            docs[i].correo = req.body.profesoresJson[i].correo
            docs[i].fecha_de_nacimiento = req.body.profesoresJson[i].fecha_de_nacimiento
            docs[i].num_telefono = req.body.profesoresJson[i].num_telefono
            docs[i].num_cursos_impartidos = req.body.profesoresJson[i].num_cursos_impartidos
            docs[i].idUser = req.body.profesoresJson[i].idUser
        }
    
        const result = await collection.insertMany(docs);
        
        // Estructuracion del mensaje de respuesta.
        let msg = []
        for (i = 0; i < result.insertedCount; i++){
            msg[i] = {}
            msg[i].msg = `Documento insertado de manera exitosa. ID: ${result.insertedIds[i]}`
        }

        res.json({
            "msg": msg,
        })
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            "msg": `Ha ocurrido un error.`,
            "error": `${err}`,
        });
    } finally {
        await client.close();
    }
  }

module.exports = {
    subirClases,
    subirProfesores,
};
