import { clientConnect } from "../connection.js";
import { mongodbInf } from "../config.js";
import mongodb from "mongodb";

async function subirAlumnos(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("alumnos");

        // Crear el arreglo de Docs
        const data = JSON.parse(req.body.alumnosJson)

        let docs = []
        for (let i = 0; i < data.length; i++) {
            docs[i] = {}
            docs[i].curp = data[i].curp
            docs[i].clave_unica_identificacion = data[i].clave_unica_identificacion
            docs[i].nombre = data[i].nombre
            docs[i].apellido_paterno = data[i].apellido_paterno
            docs[i].apellido_materno = data[i].apellido_materno
            docs[i].fecha_de_nacimiento = data[i].fecha_de_nacimiento
            docs[i].tutor_nombre = data[i].tutor_nombre
            docs[i].tutor_apellido_paterno = data[i].tutor_apellido_paterno
            docs[i].tutor_apellido_materno = data[i].tutor_apellido_materno
            docs[i].tutor_correo = data[i].tutor_correo
            docs[i].tutor_num_telefono = data[i].tutor_num_telefono
            docs[i].num_telefono = data[i].num_telefono
            docs[i].pais = data[i].pais
            docs[i].estado = data[i].estado
            docs[i].ciudad = data[i].ciudad
            docs[i].colonia = data[i].colonia
            docs[i].codigo_postal = data[i].codigo_postal
            docs[i].escolaridad = data[i].escolaridad
            docs[i].ultima_escuela = data[i].ultima_escuela
            docs[i].idUser = data[i].idUser
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
    }
}


async function subirClases(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
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
            docs[i].matriculaProfesor = req.body.clasesJson[i].matriculaProfesor
            docs[i].nombreProfesor = req.body.clasesJson[i].nombreProfesor
            docs[i].apellidosProfesor = req.body.clasesJson[i].apellidosProfesor
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
    }
}

async function subirProfesores(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
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
    }
}

async function subirPeriodos(req, res) {
    try {
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("periodos");

        // Crear el arreglo de Docs
        const data = JSON.parse(req.body.periodosJson)

        let docs = []
        for (let i = 0; i < data.length; i++) {
            docs[i] = {}
            docs[i].clave = data[i].clave
            docs[i].status = data[i].status
            docs[i].fecha_inicio = data[i].fecha_inicio
            docs[i].fecha_fin = data[i].fecha_fin
            docs[i].fecha_inicio_insc_talleres = data[i].fecha_inicio_insc_talleres
            docs[i].fecha_fin_insc_talleres = data[i].fecha_fin_insc_talleres
            docs[i].fecha_inicio_insc_idiomas = data[i].fecha_inicio_insc_idiomas
            docs[i].fecha_fin_insc_idiomas = data[i].fecha_fin_insc_idiomas
            docs[i].fecha_inicio_insc_asesorias = data[i].fecha_inicio_insc_asesorias
            docs[i].fecha_fin_insc_asesorias = data[i].fecha_fin_insc_asesorias
            docs[i].cursos_max_por_alumno = data[i].cursos_max_por_alumno
            docs[i].idiomas_max_por_alumno = data[i].idiomas_max_por_alumno
            docs[i].cursos_inscritos = data[i].cursos_inscritos
            docs[i].alumnos_inscritos = data[i].alumnos_inscritos
            docs[i].profesores_inscritos = data[i].profesores_inscritos
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
    }
}

export {
    subirAlumnos,
    subirClases,
    subirProfesores,
    subirPeriodos
};
