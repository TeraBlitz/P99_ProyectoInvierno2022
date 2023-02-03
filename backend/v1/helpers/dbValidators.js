const { clientConnect } = require('../connection.js')
const { mongodbInf } = require('../config.js')
const mongodb = require("mongodb");

/* 
    ====================================================================
    Este archivo contiene todas las validaciones a contra base de datos.
    ====================================================================
*/

// Globales.
async function idUserExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Solo si existe.
        if(req.body.idUser){
            // Conexion a DB y coleccion.
            const database = clientConnect.db(mongodbInf.database);
            const collection = database.collection("users");

            // Comprobar que no existan campos duplicados.
            let query, validator
            query = {_id: new mongodb.ObjectId(req.body.idUser)}
            validator = await collection.find(query).toArray();
            // Validar num_telefono no duplicada.
            if(validator.length < 1) {
                return res.status(400).json({
                    msg: 'Error: El usuario no existe.',
                })
            }
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}


// Validadores para user.
async function correoNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("users");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {correo: req.body.correo}
        validator = await collection.find(query).toArray();
        // Validar correo no diplicado.
        if(validator.length > 0 && validator[0]._id !== req.body._id) {
            return res.status(400).json({
                msg: 'Error: Correo en uso.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function userNameNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("users");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {user_name: req.body.user_name}
        validator = await collection.find(query).toArray();
        // Validar user_name no diplicado.
        if(validator.length > 0 && validator[0]._id !== req.body._id) {
            return res.status(400).json({
                msg: 'Error: Username en uso.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}


// Validadores para alumnoClases.
async function alumnoExiste(req, res, next){
    // Verificar si existe el documento.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("alumnos");

        // Query.
        let query, validator
        query = {_id: new mongodb.ObjectId(req.body.idAlumno)}
        validator = await collection.find(query).toArray();
        // Validar que exista.
        if(validator.length < 1) {
            return res.status(400).json({
                msg: 'Error: No existe el alumno.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function claseExiste(req, res, next){
    // Verificar si existe el documento.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Query.
        let query, validator
        query = {_id: new mongodb.ObjectId(req.body.idClase)}
        validator = await collection.find(query).toArray();
        // Validar que exista.
        if(validator.length < 1) {
            return res.status(400).json({
                msg: 'Error: No existe la clase.',
            })
        }

        // Obtenemos datos a contrabase y lo agregamos.
        req.body.areaClase = validator[0].area
        req.body.claveClase = validator[0].clave
        req.body.nombre_cursoClase = validator[0].nombre_curso
        req.body.idPeriodo = validator[0].idPeriodo

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function periodoExiste(req, res, next){
    // Verificar si existe el documento.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("periodos");

        // Query.
        let query, validator
        query = {_id: new mongodb.ObjectId(req.body.idPeriodo)}
        validator = await collection.find(query).toArray();
        // Validar que exista.
        if(validator.length < 1) {
            return res.status(400).json({
                msg: 'Error: No existe el periodo.',
            })
        }

        // Obtenemos datos a contrabase y lo agregamos.
        req.body.clavePeriodo = validator[0].clave
        req.body.statusPeriodo = validator[0].status

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function alumnoClaseNoExiste(req, res, next){
    // Verificar si existe el documento.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("alumnoClases");

        // Query.
        let query, validator
        query = {
            idAlumno: new mongodb.ObjectId(req.body.idAlumno),
            idClase: new mongodb.ObjectId(req.body.idClase),
        }
        validator = await collection.find(query).toArray();
        // Validar que exista.
        if(validator.length > 0) {
            return res.status(400).json({
                msg: 'Error: El alumno ya esta registrado en la clase',
                validator: validator
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function alumnoNoExcedeCursos(req, res, next){
    // Verificar que el usuario no meta cursos de mas.
    try{
        let query, validator, numCursosAlumno, numCursosPermitidos
        // Conexion a DB.
        const database = clientConnect.db(mongodbInf.database);
        
        // Obtener Cursos del Alumno en el Periodo.
        const collectionAC = database.collection("alumnoClases");
        query = {
            idAlumno: new mongodb.ObjectId(req.body.idAlumno),
            idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
        }
        validator = await collectionAC.find(query).toArray();
        numCursosAlumno = validator.length // Cursos del alumno en el periodo.

        // Revisar cursos permitidos en el periodo.
        const collectionP = database.collection("periodos")
        query = {
            _id: new mongodb.ObjectId(req.body.idPeriodo),
        }
        validator = await collectionP.find(query).toArray();
        numCursosPermitidos = validator[0].cursos_max_por_alumno // Cursos del alumno en el periodo.

        // Validar correo no diplicado.
        if(numCursosAlumno >= numCursosPermitidos) {
            return res.status(400).json({
                msg: `Error: El alumno tiene el maximo de cursos permitidos para el periodo.
                Periodo: ${validator[0].clave}
                Cursos Maximos Permitidos: ${numCursosPermitidos}
                Cursos del Alumno: ${numCursosAlumno}`,
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function alumnoNoExcedeIdiomas(req, res, next){
    // Verificar que el usuario no meta cursos de mas.
    try{
        let query, validator, numIdiomasAlumno, numIdiomasMax
        // Conexion a DB.
        const database = clientConnect.db(mongodbInf.database);
        
        // Obtener idiomas del Alumno en el Periodo.
        const collectionAC = database.collection("alumnoClases");
        query = {
            idAlumno: new mongodb.ObjectId(req.body.idAlumno),
            idPeriodo: new mongodb.ObjectId(req.body.idPeriodo),
            areaClase: "idiomas",
        }
        validator = await collectionAC.find(query).toArray();
        numIdiomasAlumno = validator.length // Cursos del alumno en el periodo.

        // Revisar cursos permitidos en el periodo.
        const collectionP = database.collection("periodos")
        query = {
            _id: new mongodb.ObjectId(req.body.idPeriodo),
        }
        validator = await collectionP.find(query).toArray();
        numIdiomasMax = validator[0].idiomas_max_por_alumno // Cursos del alumno en el periodo.

        // Validar correo no diplicado.
        if(numIdiomasAlumno >= numIdiomasMax && req.body.areaClase == 'idiomas') {
            return res.status(400).json({
                msg: `Error: El alumno tiene el maximo de idiomas permitidos para el periodo.
                Periodo: ${validator[0].clave}
                Idiomas Maximos: ${numIdiomasMax}
                Idiomas del Alumno: ${numIdiomasAlumno}`,
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function claseTieneCupo(req, res, next){
    // Verificar si la clase tiene espacio.
    try{
        let query, validator, cupoMaxClase, cupoActualClase
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);

        // Obtener cupo de la clase.
        const collectionC = database.collection("clases");
        query = { 
            _id: new mongodb.ObjectId(req.body.idClase) 
        }
        validator = await collectionC.find(query).toArray();
        cupoMaxClase = validator[0].cupo_maximo
        const periodoClase = validator[0].clavePeriodo
        const claveClase = validator[0].clave

        // Obtener alumnos inscritos en la clase.
        const collectionAC = database.collection("alumnoClases");
        query = { 
            idClase: new mongodb.ObjectId(req.body.idClase) 
        }
        validator = await collectionAC.find(query).toArray();
        cupoActualClase = validator.length
        
        if(cupoActualClase >= cupoMaxClase) {
            return res.status(400).json({
                msg: `Error: La clase esta llena.
                Periodo: ${periodoClase}
                Clave Clase: ${claveClase}`,
            })
        }

        /* console.log(`Estado: La clase tiene cupo.
        Periodo: ${periodoClase}
        Clave Clase: ${claveClase}
        Cupo Max: ${cupoMaxClase}
        Cupo Actual: ${cupoActualClase}`) */

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}


// Validadores para clases.
async function claseNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("clases");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {
            clave: req.body.clave,
            clavePeriodo: req.body.clavePeriodo,
        }
        validator = await collection.find(query).toArray();
        // Validar correo no diplicado.
        if(validator.length > 0) {
            return res.status(400).json({
                msg: 'Error: La clase con esa clave y periodo ya esta registrada.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function clavePeriodoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("periodos");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {
            clave: req.body.clavePeriodo
        }
        validator = await collection.find(query).toArray();
        // Validar correo no diplicado.
        if(validator.length < 1) {
            return res.status(400).json({
                msg: `Error: Clave de Periodo: '${req.body.clavePeriodo}' no corresponde a un periodo existente.`,
            })
        }

        // Obtenemos el id del periodo.
        req.body.idPeriodo = validator[0]._id

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function matriculaProfesorExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("profesores");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {
            matricula: req.body.matriculaProfesor,
        }
        validator = await collection.find(query).toArray();
        // Validar correo no diplicado.
        if(validator.length < 1) {
            return res.status(400).json({
                msg: `Error: Matricula de Profesor: '${req.body.matriculaProfesor}' no corresponde a un profesor existente.`,
            })
        }

        // Obtenemos los datos de la base.
        req.body.idProfesor = validator[0]._id
        req.body.nombreProfesor = validator[0].nombre
        req.body.apellidosProfesor = validator[0].apellidos

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}


// Validadores para profesores.
async function correoProfesorNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("profesores");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {correo: req.body.correo}
        validator = await collection.find(query).toArray();
        // Validar correo no diplicado.
        if(validator.length > 0) {
            return res.status(400).json({
                msg: 'Error: Correo en uso.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function matriculaProfesorNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Conexion a DB y coleccion.
        const database = clientConnect.db(mongodbInf.database);
        const collection = database.collection("profesores");

        // Comprobar que no existan campos duplicados.
        let query, validator
        query = {matricula: req.body.matricula}
        validator = await collection.find(query).toArray();
        // Validar matricula no duplicada.
        if(validator.length > 0) {
            return res.status(400).json({
                msg: 'Error: Matricula en uso.',
            })
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}

async function numeroProfesorNoExiste(req, res, next){
    // Verificar si existe el correo.
    try{
        // Solo si existe.
        if(req.body.num_telefono){
            // Conexion a DB y coleccion.
            const database = clientConnect.db(mongodbInf.database);
            const collection = database.collection("profesores");

            // Comprobar que no existan campos duplicados.
            let query, validator
            query = {num_telefono: req.body.num_telefono}
            validator = await collection.find(query).toArray();
            // Validar num_telefono no duplicada.
            if(validator.length > 0) {
                return res.status(400).json({
                    msg: 'Error: Numero de telefono en uso.',
                })
            }
        }

        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg: 'Ha ocurrido un error inesperado, hable con el administrador.'
        })
    }
}


module.exports = {
    // Globales
    idUserExiste,
    // Validadores para user.
    correoNoExiste,
    userNameNoExiste,
    // Validadores para alumnoClases.
    alumnoExiste,
    claseExiste,
    periodoExiste,
    alumnoClaseNoExiste,
    alumnoNoExcedeCursos,
    alumnoNoExcedeIdiomas,
    claseTieneCupo,
    // Validadores para clases.
    claseNoExiste,
    clavePeriodoExiste,
    matriculaProfesorExiste,
    // Validadores para profesores.
    correoProfesorNoExiste,
    matriculaProfesorNoExiste,
    numeroProfesorNoExiste,
}