
import mongodb from "mongodb"
import { mongodbInf } from "../v1/config.js"
import { clientConnect } from "../v1/connection.js"
import {writeFile} from "fs/promises"

function ytd(yourDate) {
    let difference = new Date() - new Date(yourDate);
    let millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25
    let yearsPassed = difference / millisecondsInYear
    return Math.floor(yearsPassed)
}

async function x() {
    const database = clientConnect.db(mongodbInf.database);
    const alumnoClase = database.collection('alumnoClases');
    const clases = database.collection('clases');
    const alumnos = database.collection('alumnos');
    
    let ac =await alumnoClase.find().toArray()
    let clase =await clases.find().toArray()
    let alumno =await alumnos.find().toArray()

    let jsonBuilder = {}

    // let claseInfo = clase.find((el)=>el._id==acc.idClase)
    ac.forEach((acc) => {
        // console.log(acc.idClase)
        // console.log(typeof String(acc.idClase))
        if(!jsonBuilder[acc.idClase]) {
            jsonBuilder[acc.idClase] = {alumnos:[]}
        }
        let alumnos = alumno.find(el => String(el._id) == String(acc.idAlumno))
        jsonBuilder[acc.idClase].alumnos.push(alumnos) //.push({name:name.nombre_curso, clave:name.clavePerido})
    })
    let csvString = 'Clave materia, nombre alumno, edad alumno, número telefónico, correo \n'
    Object.keys(jsonBuilder).forEach((cls)=> {
        let claseInfo = clase.find((el)=>String(el._id)==String(cls))
        if(!claseInfo){
            return
        }
            
        jsonBuilder[cls].alumnos.forEach((alm)=> {
            // console.log('?', alm)
            // console.log('?', csvString.length)
            // console.log(alm)
            if(!alm){
                console.log(cls)
                return
            }
            csvString = csvString.concat(`${claseInfo.clave},${alm.nombre} ${alm.apellido_paterno} ${alm.apellido_materno},${ytd(alm.fecha_de_nacimiento)},${alm.num_telefono},${alm.tutor_correo} \n`)
        })
        console.log(typeof csvString)
    })
    console.log('final ', csvString)
    writeFile('mycsv.csv', csvString, 'utf8')
    // console.log(x)
}

x()




