import { clientConnect } from '../connection.js'
import { mongodbInf } from '../config.js'
import mongodb from "mongodb"

async function validarRolAdmin(req, res, next){
    // console.log(">>>>>>>>>",req.auth)
    // console.log(">>>>>>>>>",req.body)
    // console.log(">>>>>>>>>",req.locals)
    
    // const database = clientConnect.db(mongodbInf.database);
    // const collection = database.collection("users");

    // try {
    //     // Obtener datos del usuario.
    //     const query = {_id: new mongodb.ObjectId(req.udi)}
    //     const result = await collection.find(query).toArray();
    //     usuario = result[0]

    //     // Validar rol del usuario.
    //     if(usuario.rol !== 'admin'){
    //         return res.status(400).json({
    //             msg: `ERROR: El usuario no es administrador.`
    //         })
    //     }

    //     next()
    // }catch(error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         msg: `ERROR: validarRolAdmin.`
    //     })
    // }
}

export {
    validarRolAdmin,
}